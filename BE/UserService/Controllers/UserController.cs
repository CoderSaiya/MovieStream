using UserService.Models;
using UserService.DTOs;
using Microsoft.AspNetCore.Mvc;
using UserService.Data;
using UserService.Events;
using SharedLibrary.EventBus;

namespace UserService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserDbContext _context;
        private readonly IEventBus _eventBus;

        public UsersController(UserDbContext context, IEventBus eventBus)
        {
            _context = context;
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

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var userCreatedEvent = new UserCreatedIntegrationEvent(user.Id, user.Email, user.IsVip);
            _eventBus.Publish(userCreatedEvent);

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] User user)
        {
            if (id != user.Id) return BadRequest();

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null) return NotFound();

            existingUser.Email = user.Email;
            existingUser.IsVip = user.IsVip;
            await _context.SaveChangesAsync();

            var userUpdatedEvent = new UserUpdatedIntegrationEvent(user.Id, user.IsVip);
            _eventBus.Publish(userUpdatedEvent);

            return NoContent();
        }
    }
}
