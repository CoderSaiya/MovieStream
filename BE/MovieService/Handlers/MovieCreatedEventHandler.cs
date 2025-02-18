﻿using SharedLibrary.RabbitMQ.Integration;
using SharedLibrary.RabbitMQ.Events;

namespace MovieService.Handlers
{
    public class MovieCreatedEventHandler : IIntegrationEventHandler<MovieCreatedEvent>
    {
        public Task Handle(MovieCreatedEvent @event)
        {
            Console.WriteLine($"Movie Created: {@event.Title} with ID: {@event.MovieId}");
            return Task.CompletedTask;
        }
    }
}
