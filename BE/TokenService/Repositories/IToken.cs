using AuthService.Models;

namespace AuthService.Repositories
{
    public interface IToken
    {
        Task<RefreshToken> GetRefreshTokenByValueAsync(string token);
        Task<bool> UpdateRefreshTokenAsync(RefreshToken refreshToken);
    }
}
