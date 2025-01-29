using SharedLibrary.RabbitMQ.Integration;

namespace SharedLibrary.RabbitMQ.Events
{
    public class UserValidatedEvent : IntegrationEvent
    {
        private object id;
        private bool v;
        private object value;

        public Guid UserId { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }

        public UserValidatedEvent(object id, bool v, object value)
        {
            this.id = id;
            this.v = v;
            this.value = value;
        }
    }
}
