using System.ComponentModel.DataAnnotations;

namespace UserService.Models;

public class User
{
    [Key]
    public Guid Id { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public bool IsVip { get; set; } = false;
}
