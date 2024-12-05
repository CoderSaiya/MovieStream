using AuthService.Data;
using AuthService.DTOs;
using AuthService.Repositories;
using Microsoft.AspNetCore.Mvc;
using SharedLibrary.EventBus;
using SharedLibrary.Events;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : Controller
    {
        private readonly IdentityDbContext _context;
        private readonly IEventBus _eventBus;
        private readonly IToken _authRepo;

        public TokenController(IdentityDbContext context, IEventBus eventBus, IToken authRepo)
        {
            _context = context;
            _eventBus = eventBus;
            _authRepo = authRepo;
        }

        [HttpPost("validate-token")]
        public async Task<IActionResult> ValidateToken([FromBody] TokenValidationRequest request)
        {
            var token = await _authRepo.GetRefreshTokenByValueAsync(request.Token);

            if (token == null)
                return NotFound("Token not found.");

            if (token.ExpiryDate <= DateTime.UtcNow || token.IsUsed || token.IsRevoked)
                return BadRequest("Token is invalid.");

            var validationEvent = new UserValidationRequestedEvent(token.UserId);
            _eventBus.Publish(validationEvent);

            return Ok("User validation event sent.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(TokenService.DTOs.LoginRequest request)
        {
            var loginEvent = new UserLoginRequestedEvent(request.Username, request.Password);
            _eventBus.Publish(loginEvent);

            return Accepted("Login request sent. Waiting for processing...");
        }
    }
}
