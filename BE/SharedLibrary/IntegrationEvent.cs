﻿namespace SharedLibrary
{
    public class IntegrationEvent
    {
        public Guid Id { get; } = Guid.NewGuid();
        public DateTime CreatedAt { get; } = DateTime.UtcNow;
    }
}