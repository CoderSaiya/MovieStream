using Prometheus;
using Prometheus.SystemMetrics;

var builder = WebApplication.CreateBuilder(args);

// Regist System Metrics (CPU, RAM, Disk)
builder.Services.AddSystemMetrics();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<ICollectorRegistry, CollectorRegistry>();

var app = builder.Build();

app.UseRouting();
app.UseHttpMetrics();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapMetrics();
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();