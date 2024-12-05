using AuthService.Data;
using AuthService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        public string GenerateAccessToken(IEnumerable<Claim> claims)
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
    }
}
