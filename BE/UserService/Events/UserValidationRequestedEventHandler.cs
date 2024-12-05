using Microsoft.EntityFrameworkCore;
using SharedLibrary;
using SharedLibrary.Events;
using UserService.Data;

namespace UserService.Events
{
    public class UserValidationRequestedEventHandler : IIntegrationEventHandler<UserValidationRequestedEvent>
    {
        private readonly IEventBus _eventBus;
        private readonly UserDbContext _dbContext;

        public UserValidationRequestedEventHandler(IEventBus eventBus, UserDbContext dbContext)
        {
            _eventBus = eventBus;
            _dbContext = dbContext;
        }

        public async Task Handle(UserValidationRequestedEvent @event)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == @event.UserId);

            if (user == null)
                return;

            var validatedEvent = new UserValidatedEvent
            {
                UserId = user.Id,
                Email = user.Email,
                UserName = user.Username
            };
            _eventBus.Publish(validatedEvent);
        }
    }

}
