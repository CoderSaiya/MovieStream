namespace UserService.DTOs
{
    public class CreateUserRequest
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
    }
}
