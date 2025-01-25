using SharedLibrary.EventBus;
using SharedLibrary.Events;
using SharedLibrary.Integration;
using UserService.Model;
using UserService.Models;
using UserService.Services;

namespace UserService.Handlers
{
    public class UserLoginRequestedEventHandler : IIntegrationEventHandler<IntegrationEvent>
    {
        private readonly IUser _userRepository;
        private readonly IEventBus _eventBus;

        public UserLoginRequestedEventHandler(IUser userRepository, IEventBus eventBus)
        {
            _userRepository = userRepository;
            _eventBus = eventBus;
        }

        public async Task Handle(IntegrationEvent @event)
        {
            switch (@event)
            {
                case UserLoginRequestedEvent userLoginEvent:
                    await HandleUserLoginAsync(userLoginEvent);
                    break;

                case GoogleLoginEvent googleLoginEvent:
                    await HandleGoogleLoginAsync(googleLoginEvent);
                    break;

                default:
                    throw new ArgumentException($"Unsupported event type: {@event.GetType().Name}");
            }
        }

        private async Task HandleUserLoginAsync(UserLoginRequestedEvent userLoginEvent)
        {
            var user = await _userRepository.GetUserByUsernameAsync(userLoginEvent.Username);

            var isPasswordValid = await _userRepository.ValidatePasswordAsync(user, userLoginEvent.Password);

            if (isPasswordValid)
            {
                await _userRepository.AddLogAsync(user.Id, "User login");
                await _userRepository.SaveChangesAsync();
            }

            PublishLoginResult(userLoginEvent.Id.ToString(), isPasswordValid, user.Id, user.Role.ToString());
        }

        private async Task HandleGoogleLoginAsync(GoogleLoginEvent googleLoginEvent)
        {
            var user = await _userRepository.GetUserByEmailAsync(googleLoginEvent.Email);
            if (user == null)
            {
                user = new User
                {
                    Id = Guid.NewGuid(),
                    Username = googleLoginEvent.Email,
                    Email = googleLoginEvent.Email,
                    Role = RoleType.User
                };

                await _userRepository.AddUserAsync(user);
                await _userRepository.SaveChangesAsync();
            }

            PublishLoginResult(googleLoginEvent.Id.ToString(), true, user.Id, user.Role.ToString());
        }

        private void PublishLoginResult(string requestId, bool isSuccess, Guid userId, string role)
        {
            var loginResultEvent = new PasswordCheckResponseEvent(requestId, isSuccess, userId, role);
            _eventBus.Publish(loginResultEvent);
        }
    }
}