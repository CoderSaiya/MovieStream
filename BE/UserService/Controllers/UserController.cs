using UserService.Models;
using UserService.DTOs;
using Microsoft.AspNetCore.Mvc;
using SharedLibrary.EventBus;
using UserService.Services;
using SharedLibrary.Events;
using Microsoft.Extensions.Logging;

namespace UserService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUser _userRepository;
        private readonly IEventBus _eventBus;

        public UsersController(IUser userRepository, IEventBus eventBus)
        {
            _userRepository = userRepository;
            _eventBus = eventBus;
        }

        [HttpPost("public/sign-up")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest userRequest)
        {
            if (!ModelState.IsValid) return BadRequest();

            var tokenGmail = Guid.NewGuid().ToString();
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = userRequest.Username,
                Password = userRequest.Password,
                Email = userRequest.Email,
                EmailVerificationToken = tokenGmail,
                EmailVerificationTokenExpiry = DateTime.UtcNow.AddHours(24),
            };

            await _userRepository.AddUserAsync(user);
            var success = await _userRepository.SaveChangesAsync();
            if (!success) return StatusCode(500, "Error saving user");

            var createdEvent = new UserCreatedEvent(user.Username, user.Password, user.Email, tokenGmail);
            _eventBus.Publish(createdEvent);

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        [HttpGet("private/{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpPut("private/{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] User user)
        {
            if (id != user.Id) return BadRequest();

            var existingUser = await _userRepository.GetUserByIdAsync(id);
            if (existingUser == null) return NotFound();

            existingUser.UpdatedAt = DateTime.UtcNow;
            existingUser.Email = user.Email;
            existingUser.IsVip = user.IsVip;

            await _userRepository.UpdateUserAsync(existingUser);
            var success = await _userRepository.SaveChangesAsync();

            if (!success) return StatusCode(500, "Error updating user");

            var userUpdatedEvent = new UserUpdatedEvent(user.Id, user.IsVip);
            _eventBus.Publish(userUpdatedEvent);

            return NoContent();
        }

        [HttpPost("public/log")]
        public async Task<IActionResult> UserBehaviorLog(Guid userId, string action, string? ip = null, string? agent = null)
        {
            var result = await _userRepository.AddLogAsync(userId, action, ip, agent);
            if (!result) return BadRequest("Failed to log!");

            var success = await _userRepository.SaveChangesAsync();
            if (!success) return StatusCode(500, "Error updating user");
            return Ok();
        }
    }
}
