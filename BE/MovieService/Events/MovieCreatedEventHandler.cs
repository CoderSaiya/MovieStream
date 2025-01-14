﻿using SharedLibrary.Integration;
using SharedLibrary.Events;

namespace MovieService.Events
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
