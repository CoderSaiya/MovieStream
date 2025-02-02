using AnalyticsService.Services.Background;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Prometheus;
using Prometheus.SystemMetrics;

var builder = WebApplication.CreateBuilder(args);

// Regist System Metrics (CPU, RAM, Disk)
builder.Services.AddSystemMetrics();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks()
    .AddCheck("self", () => HealthCheckResult.Healthy())
    .AddUrlGroup(new Uri("http://localhost:7228"), name: "User Service")
    .AddUrlGroup(new Uri("http://localhost:7225"), name: "Movie Service")
    .AddUrlGroup(new Uri("http://localhost:7226"), name: "Auth Service")
    .AddUrlGroup(new Uri("http://localhost:7227"), name: "Search Service")
    .AddUrlGroup(new Uri("http://localhost:7230"), name: "Payment Service")
    .AddUrlGroup(new Uri("http://localhost:7231"), name: "Gmail Service")
    .AddUrlGroup(new Uri("http://localhost:7233"), name: "Notification Service")
    .AddUrlGroup(new Uri("http://localhost:7234"), name: "Recommendation Service");

builder.Services.AddSingleton<ICollectorRegistry, CollectorRegistry>();
builder.Services.AddHostedService<AlertWorker>();

var app = builder.Build();

app.UseRouting();
app.UseHttpMetrics();

#pragma warning disable ASP0014
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapMetrics();
    endpoints.MapHealthChecks("/health", new HealthCheckOptions
    {
        ResponseWriter = async (context, report) =>
        {
            var result = System.Text.Json.JsonSerializer.Serialize(
                new
                {
                    status = report.Status.ToString(),
                    checks = report.Entries.Select(e => new { name = e.Key, status = e.Value.Status.ToString() }),
                    duration = report.TotalDuration
                });
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(result);
        }
    });
});
#pragma warning restore ASP0014

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();