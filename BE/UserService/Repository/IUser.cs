using UserService.Models;

namespace UserService.Repository
{
    public interface IUser
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(Guid id);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task<bool> SaveChangesAsync();
        Task<User> GetUserByUsernameAsync(string username);
        Task<User?> GetUserByEmailAsync(string email);
        Task<bool> ValidatePasswordAsync(User user, string password);
        Task<bool> AddLogAsync(Guid userId, string action, string? ip = null, string? userAgent = null);
    }
}
