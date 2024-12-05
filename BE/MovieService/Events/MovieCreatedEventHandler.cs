using SharedLibrary.Integration;

namespace MovieService.Events
{
    public class MovieCreatedEventHandler : IIntegrationEventHandler<MovieCreatedIntegrationEvent>
    {
        public Task Handle(MovieCreatedIntegrationEvent @event)
        {
            Console.WriteLine($"Movie Created: {@event.Title} with ID: {@event.MovieId}");
            return Task.CompletedTask;
        }
    }
}
