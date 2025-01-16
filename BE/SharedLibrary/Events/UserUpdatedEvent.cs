using SharedLibrary.Integration;
namespace SharedLibrary.Events
{
    public class UserUpdatedEvent : IntegrationEvent
    {
        public Guid UserId { get; set; }
        public bool IsVip { get; set; }
        public UserUpdatedEvent(Guid userId, bool isVip)
        {
            UserId = userId;
            IsVip = isVip;
        }

    }
}
