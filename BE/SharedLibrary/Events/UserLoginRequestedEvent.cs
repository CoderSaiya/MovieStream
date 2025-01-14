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
        [Required]
        public string CorrectlationId { get; }

        public UserLoginRequestedEvent(string username, string password, string correctlationId)
        {
            Username = username;
            Password = password;
            CorrectlationId = correctlationId;
        }
    }
}
