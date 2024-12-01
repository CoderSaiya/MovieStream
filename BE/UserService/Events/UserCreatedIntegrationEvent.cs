using MovieService.Events;

namespace UserService.Events
{
    public class UserCreatedIntegrationEvent : IntegrationEvent
    {
        public Guid UserId { get; set; }
        public string Email { get; set; }
        public bool IsVip { get; set; }

        public UserCreatedIntegrationEvent(Guid userId, string email, bool isVip)
        {
            UserId = userId;
            Email = email;
            IsVip = isVip;
        }
    }
}
