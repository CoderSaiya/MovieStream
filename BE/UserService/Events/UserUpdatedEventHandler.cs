using SharedLibrary;

namespace UserService.Events
{
    public class UserUpdatedEventHandler : IIntegrationEventHandler<UserUpdatedIntegrationEvent>
    {
        public Task Handle(UserUpdatedIntegrationEvent @event)
        {
            Console.WriteLine($"User Updated: {@event.UserId}, IsVip: {@event.IsVip}");
            return Task.CompletedTask;
        }
    }
}
