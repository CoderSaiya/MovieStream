namespace SharedLibrary.Events
{
    public class UserValidatedEvent : IntegrationEvent
    {
        public Guid UserId { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
    }
}
