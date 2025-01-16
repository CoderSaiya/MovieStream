﻿using SharedLibrary.Integration;

namespace SharedLibrary.Events
{
    public class UserCreatedEvent : IntegrationEvent
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public UserCreatedEvent(string username, string password, string email)
        {
            Username = username;
            Email = password;
            Email = email;
        }
    }
}
