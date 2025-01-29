using AuthService.Data;
using AuthService.DTOs;
using AuthService.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using SharedLibrary.RabbitMQ.EventBus;
using SharedLibrary.RabbitMQ.Events;
using SharedLibrary.RabbitMQ.Handler;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IdentityDbContext _context;
        private readonly IEventBus _eventBus;
        private readonly IAuth _authRepo;
        private readonly ResponseHandler _responseHandler;

        public AuthController(IdentityDbContext context, IEventBus eventBus, IAuth authRepo, ResponseHandler responseHandler)
        {
            _context = context;
            _eventBus = eventBus;
            _authRepo = authRepo;
            _responseHandler = responseHandler;
        }

        [HttpPost("private/validate-token")]
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

        [HttpPost("public/sign-in")]
        public async Task<IActionResult> Login(LoginReq request)
        {
            var correctlationId = Guid.NewGuid().ToString();
            var loginEvent = new UserLoginRequestedEvent(request.Username, request.Password);
            _eventBus.Publish(loginEvent);

            var response = await _responseHandler.WaitForResponseAsync(loginEvent.Id.ToString(), 5);
            if (response == null)
                return Unauthorized(new { Message = "Invalid username or password." });

            var result = (dynamic)response;

            var tokens = _authRepo.GenerateTokenRes(request.Username, result.UserId, result.Role);

            return Ok(tokens);
        }

        [HttpGet("public/login")]
        public IActionResult LoginWithGoogle()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleCallback")
            };

            return Challenge(properties);
        }

        [HttpGet("private/google-callback")]
        public async Task<IActionResult> GoogleCallback()
        {
            var autheticateResult = await HttpContext.AuthenticateAsync();
            if(!autheticateResult.Succeeded)
            {
                return Unauthorized(new { Message = "Google login failed" });
            }

            var claims = autheticateResult.Principal?.Identities.FirstOrDefault()?.Claims;
            var email = claims?.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.Email)?.ToString();

            if(email == null)
            {
                return BadRequest($"Unable to retrieve user email {email} from Google");
            }

            var googleLoginEvent = new GoogleLoginEvent(email);
            _eventBus.Publish(googleLoginEvent);

            var response = await _responseHandler.WaitForResponseAsync(googleLoginEvent.Id.ToString(), 5);
            if (response == null)
                return Unauthorized(new { Message = "Failed to login by this account google" });

            var result = (dynamic) response;

            var tokenResult = _authRepo.GenerateTokenRes(email, result.UserId, result.Role);
            return Ok(tokenResult);
        }
    }
}
