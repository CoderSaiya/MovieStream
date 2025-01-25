namespace GmailService.Services
{
    public interface IGmail
    {
        public Task SendEmailAsync(string toEmail, string subject, string body);
    }
}