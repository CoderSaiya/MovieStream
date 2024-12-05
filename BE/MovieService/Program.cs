using Microsoft.EntityFrameworkCore;
using MovieService.Data;
using MovieService.Events;
using MovieService.Repositories;
using SharedLibrary.EventBus;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext for SQL Server
builder.Services.AddDbContext<MovieDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IMovie, MovieRepo>();

// Add RabbitMQ Event Bus
builder.Services.AddSingleton<IEventBus, EventBus>(sp =>
{
    var serviceProvider = sp.GetRequiredService<IServiceProvider>();
    var hostName = builder.Configuration["RabbitMQ:HostName"] ?? "localhost";
    return new EventBus(serviceProvider, hostName);
});

// Register Event Handlers
builder.Services.AddTransient<MovieCreatedEventHandler>();
builder.Services.AddTransient<MovieViewedEventHandler>();

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
    eventBus.Subscribe<MovieCreatedIntegrationEvent, MovieCreatedEventHandler>();
    eventBus.Subscribe<MovieViewedIntegrationEvent, MovieViewedEventHandler>();
});

app.Run();
