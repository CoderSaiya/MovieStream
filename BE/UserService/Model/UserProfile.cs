using System.ComponentModel.DataAnnotations;
using UserService.Models;

namespace UserService.Model
{
    public class UserProfile
    {
        [Key]
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public string AvatarFilePath { get; set; } = "images/init-avatar.png";
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Nation { get; set; } = string.Empty;
        public SexType Sex { get; set; } = 0;
        public string Language { get; set; } = string.Empty;
        public DateOnly? Birthday { get; set; } = null!;

    }
}
