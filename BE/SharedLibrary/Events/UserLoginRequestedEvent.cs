using SharedLibrary.Integration;
using System.ComponentModel.DataAnnotations;

namespace SharedLibrary.Events
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
