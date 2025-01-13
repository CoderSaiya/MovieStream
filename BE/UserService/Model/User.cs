using System.ComponentModel.DataAnnotations;
using UserService.Model;

namespace UserService.Models;

public class User
{
    [Key]
    public Guid Id { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    public required string Email { get; set; }
    public RoleType Role { get; set; }
    public bool IsVip { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public UserProfile UserProfile { get; set; } = null!;
    public ICollection<UserLog> UserLogs { get; set; } = new List<UserLog>();
}
