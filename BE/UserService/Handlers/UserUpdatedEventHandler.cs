using SharedLibrary.RabbitMQ.Integration;
using SharedLibrary.RabbitMQ.Events;

namespace UserService.Handlers
{
    public class UserUpdatedEventHandler : IIntegrationEventHandler<UserUpdatedEvent>
    {
        public Task Handle(UserUpdatedEvent @event)
        {
            Console.WriteLine($"User Updated: {@event.UserId}, IsVip: {@event.IsVip}");
            return Task.CompletedTask;
        }
    }
}
