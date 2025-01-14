using AuthService.Data;
using AuthService.DTOs;
using AuthService.Repositories;
using Microsoft.AspNetCore.Mvc;
using SharedLibrary.EventBus;
using SharedLibrary.Events;
using SharedLibrary.Handler;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : Controller
    {
        private readonly IdentityDbContext _context;
        private readonly IEventBus _eventBus;
        private readonly IToken _authRepo;
        private readonly ResponseHandler _responseHandler;

        public TokenController(IdentityDbContext context, IEventBus eventBus, IToken authRepo, ResponseHandler responseHandler)
        {
            _context = context;
            _eventBus = eventBus;
            _authRepo = authRepo;
            _responseHandler = responseHandler;
        }

        [HttpPost("public/validate-token")]
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

        [HttpPost("public/login")]
        public async Task<IActionResult> Login(TokenService.DTOs.LoginRequest request)
        {
            var correctlationId = Guid.NewGuid().ToString();
            var loginEvent = new UserLoginRequestedEvent(request.Username, request.Password, correctlationId);
            _eventBus.Publish(loginEvent);

            var response = await _responseHandler.WaitForResponseAsync(correctlationId, 5);
            if (response == null)
                return Unauthorized(new { Message = "Invalid username or password." });

            var result = (dynamic)response;

            var tokens = _authRepo.GenerateTokenRes(request.Username, result.UserId, result.Role);

            return Ok(tokens);
        }
    }
}
