using SharedLibrary.RabbitMQ.Integration;

namespace SharedLibrary.RabbitMQ.Events
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
