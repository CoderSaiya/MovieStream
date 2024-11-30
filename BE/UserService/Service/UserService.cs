using UserService.Models;

namespace UserService.Services;

public class UserService
{
    private readonly List<User> _users = new();

    public User AddUser(string username, string email)
    {
        var user = new User { Id = Guid.NewGuid(), Username = username, Email = email, IsVip = false };
        _users.Add(user);
        return user;
    }

    public User? GetUser(Guid id) => _users.FirstOrDefault(u => u.Id == id);

    public void UpgradeToVip(Guid userId)
    {
        var user = _users.FirstOrDefault(u => u.Id == userId);
        if (user != null) user.IsVip = true;
    }
}
