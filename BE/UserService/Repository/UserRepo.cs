using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UserService.Data;
using UserService.Model;
using UserService.Models;

namespace UserService.Repository
{
    public class UserRepo : IUser
    {
        private readonly UserDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;
        public UserRepo(UserDbContext context, PasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }
        public async Task AddUserAsync(User user)
        {
            var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.Username == user.Username);
            if (existingUser != null)
            {
                throw new Exception("User is already!");
            }

            user.Password = _passwordHasher.HashPassword(user, user.Password);
            await _context.Users.AddAsync(user);

            var userProfile = new UserProfile
            {
                UserId = user.Id,
            };
            await _context.UserProfile.AddAsync(userProfile);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.Where(u => u.Email == email).FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<bool> ValidatePasswordAsync(User user, string password)
        {
            if (user == null || string.IsNullOrEmpty(password))
            {
                return false;
            }

            return await Task.FromResult(BCrypt.Net.BCrypt.Verify(password, user.Password));
        }

        public async Task<bool> AddLogAsync(Guid userId, string action, string? ip = null, string? userAgent = null)
        {
            var existingUser = await _context.Users.FindAsync(userId);
            if (existingUser == null)
            {
                return false;
            }

            var log = new UserLog
            {
                UserId = userId,
                Action = action,
                IpAddress = ip,
                UserAgent = userAgent,
            };

            await _context.UserLog.AddAsync(log);
            return true;
        }
    }
}
