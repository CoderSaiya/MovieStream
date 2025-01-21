using SharedLibrary.Integration;

namespace SharedLibrary.Events
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
