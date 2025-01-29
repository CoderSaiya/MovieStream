using System.ComponentModel.DataAnnotations;
using SharedLibrary.RabbitMQ.Integration;

namespace SharedLibrary.RabbitMQ.Events
{
    public class UserLoginRequestedEvent : IntegrationEvent
    {
        [Required]
        public string Username { get; }
        [Required]
        public string Password { get; }

        public UserLoginRequestedEvent(string username, string password)
        {
            Username = username;
            Password = password;
        }
    }
}
