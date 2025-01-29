using SharedLibrary.RabbitMQ.Integration;

namespace SharedLibrary.RabbitMQ.Events
{
    public class UserCreatedEvent : IntegrationEvent
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string TokenGmail { get; set; }

        public UserCreatedEvent(string username, string password, string email, string tokenGmail)
        {
            Username = username;
            Email = password;
            Email = email;
            TokenGmail = tokenGmail;
        }
    }
}
