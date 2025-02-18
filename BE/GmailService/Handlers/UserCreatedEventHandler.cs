﻿using GmailService.Services;
using SharedLibrary.RabbitMQ.Events;
using SharedLibrary.RabbitMQ.Integration;

namespace GmailService.Handler
{
    public class UserCreatedEventHandler : IIntegrationEventHandler<UserCreatedEvent>
    {
        private readonly IGmail _gmailService;
        private readonly IConfiguration _configuration;

        public UserCreatedEventHandler(IGmail gmailServioce, IConfiguration configuration)
        {
            _gmailService = gmailServioce;
            _configuration = configuration;
        }

        public  Task Handle(UserCreatedEvent @event)
        {
            var baseUrl = _configuration["VerificationBaseUrl"];
            var subject = "Verify your account";
            var verificationUrl = $"{baseUrl}/verify-email?token={@event.TokenGmail}";
            var emailBody = $"Please verify your email by clicking this link: {verificationUrl}";

            _gmailService.SendEmailAsync(@event.Email, subject, emailBody);
            return Task.CompletedTask;
        }
    }
}
