using System.Text.RegularExpressions;

namespace AnalyticsService.Services.Background;

public class AlertWorker : BackgroundService
{
    private readonly ILogger<AlertWorker> _logger;
    private readonly IHttpClientFactory _httpClientFactory;
    private HttpClient _httpClient;
    
    private const string MetricsUrl = "http://localhost:7232/metrics";

    public AlertWorker(ILogger<AlertWorker> logger, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _httpClient = _httpClientFactory.CreateClient();

        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("🔍 Checking system...");

            try
            {
                var response = _httpClient.GetAsync(MetricsUrl, stoppingToken);
                if (!response.IsCompletedSuccessfully)
                {
                    _logger.LogError($"❌ Lỗi HTTP: {response.Status}");
                    continue;
                }
                
                string metrics = await response.Result.Content.ReadAsStringAsync(stoppingToken);
                
                await Task.WhenAll(
                    CheckMetrics(metrics, "system_cpu_usage", 80, "⚠ CPU Usage over 80%!"),
                    CheckMetrics(metrics, "system_memory_usage", 2048, "⚠ Memory Usage over 2GB!"),
                    CheckMetrics(metrics, "http_requests_total", 1000, "⚠ Request Count over 1000!")
                );
            }
            catch (Exception e)
            {
                _logger.LogError($"❌ Lỗi khi lấy metrics: {e.Message}");
            }
            
            await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
        }
    }

    private async Task CheckMetrics(string metrics, string metricName, double threshold, string message)
    {
        double value = ExtractMetricValue(metrics, metricName);
        if (value > threshold)
        {
            _logger.LogWarning($"📢 Warning: {message} (Value: {value})");
            await SendMessage(message);
        }
    }
    
    private double ExtractMetricValue(string metrics, string metricName)
    {
        var match = Regex.Match(metrics, @$"^{metricName}\s+([\d\.]+)", RegexOptions.Multiline);
        return match.Success && double.TryParse(match.Groups[1].Value, out double value) ? value : 0;
    }

    private async Task SendMessage(string message)
    {
        //update sau
    }
}