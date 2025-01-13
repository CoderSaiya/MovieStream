using System.ComponentModel.DataAnnotations;
using UserService.Models;

namespace UserService.Model
{
    public class UserLog
    {
        [Key]
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public string Action { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string? IpAddress { get; set; }
        public string? UserAgent { get; set; }
    }
}
