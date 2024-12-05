using SharedLibrary;

namespace UserService.Events
{
    public class UserCreatedEventHandler : IIntegrationEventHandler<UserCreatedIntegrationEvent>
    {
        public Task Handle(UserCreatedIntegrationEvent @event)
        {
            Console.WriteLine($"User Created: {@event.UserId}, Email: {@event.Email}, IsVip: {@event.IsVip}");
            return Task.CompletedTask;
        }
    }
}
