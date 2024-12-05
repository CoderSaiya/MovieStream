using SharedLibrary;
namespace UserService.Events
{
    public class UserUpdatedIntegrationEvent : IntegrationEvent
    {
        public Guid UserId { get; set; }
        public bool IsVip { get; set; }
        public UserUpdatedIntegrationEvent(Guid userId, bool isVip)
        {
            UserId = userId;
            IsVip = isVip;
        }

    }
}
