using SharedLibrary.Integration;
using SharedLibrary.Events;

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
