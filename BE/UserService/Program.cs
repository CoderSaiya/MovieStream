using UserService.Data;
using Microsoft.EntityFrameworkCore;
using SharedLibrary.EventBus;
using UserService.Handlers;
using UserService.Repository;
using SharedLibrary.Events;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<UserDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});

builder.Services.AddScoped<IUser, UserRepo>();

// Add RabbitMQ Event Bus
builder.Services.AddSingleton<IEventBus, EventBus>(sp =>
{
    var serviceProvider = sp.GetRequiredService<IServiceProvider>();
    var hostName = builder.Configuration["RabbitMQ:HostName"] ?? "localhost";
    return new EventBus(serviceProvider, hostName);
});

builder.Services.AddTransient<UserCreatedEventHandler>();
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
    eventBus.Subscribe<UserCreatedEvent, UserCreatedEventHandler>();
    //eventBus.Subscribe<UserUpdatedEvent, UserUpdatedEventHandler>();
});

app.Run();
