using SharedLibrary.Integration;
using SharedLibrary.Events;
using UserService.Repository;
using UserService.Models;

namespace UserService.Handlers
{
    public class UserCreatedEventHandler : IIntegrationEventHandler<UserCreatedEvent>
    {
        private readonly IUser _userService;

        public UserCreatedEventHandler(IUser userService)
        {
            _userService = userService;
        }

        public Task Handle(UserCreatedEvent @event)
        {
            try
            {
                var user = new User 
                { 
                    Id = Guid.NewGuid(),
                    Username = @event.Username,
                    Password = @event.Password,
                    Email = @event.Email
                };
                _userService.AddUserAsync(user);

                _userService.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return Task.CompletedTask;
        }
    }
}
