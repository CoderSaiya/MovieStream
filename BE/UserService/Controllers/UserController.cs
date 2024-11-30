using UserService.Models;
using UserService.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace UserService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService.Services.UserService _userService;

        public UserController(UserService.Services.UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<User>> AddUser([FromBody] CreateUserRequest request)
        {
            var user = await _userService.AddUserAsync(request.Username, request.Email);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _userService.GetUserAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}/upgrade")]
        public async Task<IActionResult> UpgradeToVip(Guid id)
        {
            await _userService.UpgradeToVipAsync(id);
            return NoContent();
        }
    }
}
