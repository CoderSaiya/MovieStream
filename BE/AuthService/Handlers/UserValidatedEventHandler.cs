using SharedLibrary.Events;
using SharedLibrary.Integration;

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
