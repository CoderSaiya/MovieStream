using SharedLibrary.EventBus;
using SharedLibrary.Events;
using SharedLibrary.Integration;
using UserService.Repository;

namespace UserService.Handlers
{
    public class UserLoginRequestedEventHandler : IIntegrationEventHandler<UserLoginRequestedEvent>
    {
        private readonly IUser _userRepository;
        private readonly IEventBus _eventBus;

        public UserLoginRequestedEventHandler(IUser userRepository, IEventBus eventBus)
        {
            _userRepository = userRepository;
            _eventBus = eventBus;
        }

        public async Task Handle(UserLoginRequestedEvent @event)
        {
            var user = await _userRepository.GetUserByUsernameAsync(@event.Username);

            if (user == null || !await _userRepository.ValidatePasswordAsync(user, @event.Password))
            {
                // Login thất bại
                return;
            }

            var loginResultEvent = new UserValidatedEvent(user.Id, true, null);
            _eventBus.Publish(loginResultEvent);
        }
    }
}
