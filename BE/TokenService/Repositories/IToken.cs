using AuthService.Models;
using TokenService.DTOs;

namespace AuthService.Repositories
{
    public interface IToken
    {
        Task<RefreshToken> GetRefreshTokenByValueAsync(string token);
        Task<bool> UpdateRefreshTokenAsync(RefreshToken refreshToken);
        Task<TokenRes> GenerateTokenRes(string username, int userId, string role);
    }
}
