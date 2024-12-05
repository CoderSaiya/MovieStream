using AuthService.Data;
using Microsoft.EntityFrameworkCore;
using SharedLibrary.Events;
using AuthService.Events;
using AuthService.Repositories;
using SharedLibrary.EventBus;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<IdentityDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IToken, TokenRepo>();

// Add RabbitMQ Event Bus
builder.Services.AddSingleton<IEventBus, EventBus>(sp =>
{
    var serviceProvider = sp.GetRequiredService<IServiceProvider>();
    var hostName = builder.Configuration["RabbitMQ:HostName"] ?? "localhost";
    return new EventBus(serviceProvider, hostName);
});

builder.Services.AddTransient<UserValidatedEventHandler>();
builder.Services.AddTransient<UserLoginRequestedEvent>();

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
    eventBus.Subscribe<UserValidatedEvent, UserValidatedEventHandler>();
});

app.Run();
