using AuthService.Data;
using Microsoft.EntityFrameworkCore;
using SharedLibrary.Events;
using AuthService.Events;
using AuthService.Services;
using SharedLibrary.EventBus;
using SharedLibrary.Handler;
using Microsoft.AspNetCore.Authentication.Google;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

// Add DbContext for SQL Server
builder.Services.AddDbContext<IdentityDbContext>(options =>
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

builder.Services.AddAuthentication().AddGoogle(GoogleDefaults.AuthenticationScheme, option =>
{
    option.ClientId = builder.Configuration["Authentication:Google:ClientId"];
    option.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
    option.CallbackPath = "/signin-google";
});
builder.Services.AddAuthorization();

builder.Services.AddScoped<IAuth, AuthService.Services.AuthService>();

// Add RabbitMQ Event Bus
builder.Services.AddSingleton<IEventBus, EventBus>(sp =>
{
    var serviceProvider = sp.GetRequiredService<IServiceProvider>();
    return new EventBus(serviceProvider);
});

builder.Services.AddSingleton<ResponseHandler>();

builder.Services.AddTransient<UserValidatedEventHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Subscribe to Events
app.Lifetime.ApplicationStarted.Register(() =>
{
    var eventBus = app.Services.GetRequiredService<IEventBus>();
    eventBus.Subscribe<UserValidatedEvent, UserValidatedEventHandler>();
});

app.Run();
