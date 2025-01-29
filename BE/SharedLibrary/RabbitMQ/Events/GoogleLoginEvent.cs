using SharedLibrary.RabbitMQ.Integration;

namespace SharedLibrary.RabbitMQ.Events
{
    public class GoogleLoginEvent : IntegrationEvent
    {
        public string Email { get; }

        public GoogleLoginEvent(string email)
        {
            Email = email;
        }
    }
}
