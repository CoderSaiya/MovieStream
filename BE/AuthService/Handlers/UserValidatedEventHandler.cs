using SharedLibrary.RabbitMQ.Events;
using SharedLibrary.RabbitMQ.Integration;

namespace AuthService.Events
{
    public class UserValidatedEventHandler : IIntegrationEventHandler<UserValidatedEvent>
    {
        private readonly ILogger<UserValidatedEventHandler> _logger;

        public UserValidatedEventHandler(ILogger<UserValidatedEventHandler> logger)
        {
            _logger = logger;
        }

        public Task Handle(UserValidatedEvent @event)
        {
            _logger.LogInformation($"User validated: {@event.UserId}, {@event.Email}");
            return Task.CompletedTask;
        }
    }
}
