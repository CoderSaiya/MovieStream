using AuthService.DTOs;
using AuthService.Models;

namespace AuthService.Services
{
    public interface IAuth
    {
        Task<RefreshToken> GetRefreshTokenByValueAsync(string token);
        Task<bool> UpdateRefreshTokenAsync(RefreshToken refreshToken);
        Task<TokenRes> GenerateTokenRes(string username, Guid userId, string role);
    }
}