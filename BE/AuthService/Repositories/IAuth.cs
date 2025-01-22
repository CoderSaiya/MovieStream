using AuthService.DTOs;
using AuthService.Models;

namespace AuthService.Repositories
{
    public interface IAuth
    {
        Task<RefreshToken> GetRefreshTokenByValueAsync(string token);
        Task<bool> UpdateRefreshTokenAsync(RefreshToken refreshToken);
        Task<TokenRes> GenerateTokenRes(string username, Guid userId, string role);
    }
}