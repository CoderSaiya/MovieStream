using SharedLibrary.Integration;

namespace SharedLibrary.Events
{
    public class UserValidationRequestedEvent : IntegrationEvent
    {
        public Guid UserId { get; set; }

        public UserValidationRequestedEvent(Guid userId)
        {
            UserId = userId;
        }
    }
}
