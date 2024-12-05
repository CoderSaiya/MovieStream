using UserService.Models;
using UserService.DTOs;
using Microsoft.AspNetCore.Mvc;
using UserService.Events;
using SharedLibrary.EventBus;
using UserService.Repository;

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

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest userRequest)
        {
            if (!ModelState.IsValid) return BadRequest();

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = userRequest.Username,
                Password = userRequest.Password,
                Email = userRequest.Email,
            };

            await _userRepository.AddUserAsync(user);
            var success = await _userRepository.SaveChangesAsync();

            if (!success) return StatusCode(500, "Error saving user");

            var userCreatedEvent = new UserCreatedIntegrationEvent(user.Id, user.Email, user.IsVip);
            _eventBus.Publish(userCreatedEvent);

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] User user)
        {
            if (id != user.Id) return BadRequest();

            var existingUser = await _userRepository.GetUserByIdAsync(id);
            if (existingUser == null) return NotFound();

            existingUser.Email = user.Email;
            existingUser.IsVip = user.IsVip;

            await _userRepository.UpdateUserAsync(existingUser);
            var success = await _userRepository.SaveChangesAsync();

            if (!success) return StatusCode(500, "Error updating user");

            var userUpdatedEvent = new UserUpdatedIntegrationEvent(user.Id, user.IsVip);
            _eventBus.Publish(userUpdatedEvent);

            return NoContent();
        }
    }
}
