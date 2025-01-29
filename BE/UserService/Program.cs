using UserService.Data;
using Microsoft.EntityFrameworkCore;
using SharedLibrary.RabbitMQ.EventBus;
using UserService.Handlers;
using UserService.Services;
using SharedLibrary.RabbitMQ.Events;
using Microsoft.AspNetCore.Identity;
using UserService.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<UserDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});

builder.Services.AddScoped<PasswordHasher<User>>();
builder.Services.AddScoped<IUser, UserService.Services.UserService>();

// Add RabbitMQ Event Bus
builder.Services.AddSingleton<IEventBus, EventBus>(sp =>
{
    var serviceProvider = sp.GetRequiredService<IServiceProvider>();
    return new EventBus(serviceProvider);
});

//builder.Services.AddTransient<UserUpdatedEventHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Subscribe to Events
app.Lifetime.ApplicationStarted.Register(() =>
{
    var eventBus = app.Services.GetRequiredService<IEventBus>();
    //eventBus.Subscribe<UserUpdatedEvent, UserUpdatedEventHandler>();
    eventBus.Subscribe<UserLoginRequestedEvent, UserLoginRequestedEventHandler>();
    eventBus.Subscribe<GoogleLoginEvent, UserLoginRequestedEventHandler>();
});

app.Run();
