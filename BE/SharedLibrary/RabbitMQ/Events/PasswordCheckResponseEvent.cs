using SharedLibrary.RabbitMQ.Integration;

namespace SharedLibrary.RabbitMQ.Events
{
    public class PasswordCheckResponseEvent : IntegrationEvent
    {
        public string CorrelationId { get; set; }
        public bool IsPasswordValid { get; set; }
        public Guid UserId { get; set; }
        public string Role {  get; set; }
        public PasswordCheckResponseEvent(string correlationId, bool isPasswordValid, Guid userId, string role)
        {
            CorrelationId = correlationId;
            IsPasswordValid = isPasswordValid;
            UserId = userId;
            Role = role;
        }
    }
}
