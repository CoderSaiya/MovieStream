using Microsoft.EntityFrameworkCore;
using MovieService.Data;
using MovieService.Handlers;
using MovieService.Services;
using SharedLibrary.Middlewares;
using SharedLibrary.RabbitMQ.EventBus;
using SharedLibrary.RabbitMQ.Events;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

// Add DbContext for SQL Server
builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlServer(
        connectionString: builder.Configuration["ConnectionStrings:DefaultConnection"],
        sqlServerOptionsAction: sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null);
        }),
    contextLifetime: ServiceLifetime.Scoped,
    optionsLifetime: ServiceLifetime.Singleton
);

builder.Services.AddScoped<IMovie, MovieService.Services.MovieService>();
builder.Services.AddSingleton<CloudStorageService>();

// Add RabbitMQ Event Bus
builder.Services.AddSingleton<IEventBus, EventBus>(sp =>
{
    var serviceProvider = sp.GetRequiredService<IServiceProvider>();
    return new EventBus(serviceProvider);
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

// Use middleware
app.UseMiddleware<CheckRoleMiddleware>();

app.MapControllers();

// Subscribe to Events
app.Lifetime.ApplicationStarted.Register(() =>
{
    var eventBus = app.Services.GetRequiredService<IEventBus>();
    eventBus.Subscribe<MovieCreatedEvent, MovieCreatedEventHandler>();
    eventBus.Subscribe<MovieViewedIntegrationEvent, MovieViewedEventHandler>();
});

app.Run();
