namespace GmailService.Repository
{
    public interface IGmail
    {
        public Task SendEmailAsync(string toEmail, string subject, string body);
    }
}