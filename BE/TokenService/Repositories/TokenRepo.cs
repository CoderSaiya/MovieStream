using AuthService.Data;
using AuthService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TokenService.DTOs;

namespace AuthService.Repositories
{
    public class TokenRepo : IToken
    {
        private readonly IdentityDbContext _context;
        private readonly IConfiguration _config;
        public TokenRepo(IConfiguration config, IdentityDbContext context)
        {
            _config = config;
            _context = context;
        }
        public async Task<RefreshToken> GetRefreshTokenByValueAsync(string token)
        {
            return await _context.Set<RefreshToken>()
                .FirstOrDefaultAsync(rt => rt.Token == token);
        }

        public async Task<bool> UpdateRefreshTokenAsync(RefreshToken refreshToken)
        {
            _context.Set<RefreshToken>().Update(refreshToken);
            return await _context.SaveChangesAsync() > 0;
        }

        private string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new Byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public async Task<TokenRes> GenerateTokenRes(string username, Guid userId, string role)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Role, role)
            };

            var accessToken = GenerateAccessToken(claims);
            var refreshToken = GenerateRefreshToken();
            

            return new TokenRes(accessToken, refreshToken);
        }
    }
}
