using System.ComponentModel.DataAnnotations;
using UserService.Model;

namespace UserService.Models;

public class User
{
    [Key]
    public Guid Id { get; set; }
    public required string Username { get; set; }
    public string Password { get; set; } = null!;
    public required string Email { get; set; }
    public RoleType Role { get; set; } = RoleType.User;
    public bool IsVip { get; set; } = false;
    public bool IsEmailVerified { get; set; } = false;
    public string EmailVerificationToken { get; set; } = string.Empty;
    public DateTime EmailVerificationTokenExpiry { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public UserProfile UserProfile { get; set; } = null!;
    public ICollection<UserLog> UserLogs { get; set; } = new List<UserLog>();
}
