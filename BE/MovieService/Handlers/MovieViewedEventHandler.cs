using Newtonsoft.Json;
using SharedLibrary.Integration;

namespace MovieService.Handlers
{
    public class MovieViewedEventHandler : IIntegrationEventHandler<MovieViewedIntegrationEvent>
    {
        private readonly ILogger<MovieViewedEventHandler> _logger;

        public MovieViewedEventHandler(ILogger<MovieViewedEventHandler> logger)
        {
            _logger = logger;
        }

        public Task Handle(MovieViewedIntegrationEvent @event)
        {
            _logger.LogInformation($"Movie viewed event received: {JsonConvert.SerializeObject(@event)}");
            return Task.CompletedTask;
        }
    }
}
