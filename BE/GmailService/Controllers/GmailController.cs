using GmailService.Repository;
using Microsoft.AspNetCore.Mvc;

namespace GmailService.Controllers
{
    public class GmailController : ControllerBase
    {
        private readonly IGmail _gmailService;
        public GmailController(IGmail gmailService)
        {
            _gmailService = gmailService;
        }
        public async Task<IActionResult> SendMessage(string message, string toEmail, string subject)
        {
            try
            {
                await _gmailService.SendEmailAsync(toEmail, subject, message);
                return Ok("Email is sent!");
            }
            catch (Exception ex)
            {
                return BadRequest("An error occurred during processing.");
            }
            
        }
    }
}