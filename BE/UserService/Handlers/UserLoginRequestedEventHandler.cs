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

            var isPasswordValid = await _userRepository.ValidatePasswordAsync(user, @event.Password);

            if (isPasswordValid)
            {
                await _userRepository.AddLogAsync(userId: user.Id, action: "User login");
                await _userRepository.SaveChangesAsync();
            }

            var loginResultEvent = new PasswordCheckResponseEvent(@event.CorrectlationId, isPasswordValid, user.Id, user.Role.ToString());
            _eventBus.Publish(loginResultEvent);
        }
    }
}
