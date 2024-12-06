using SearchService.DTOs;
using SearchService.Repositories;
using SharedLibrary.Events;
using SharedLibrary.Integration;

namespace SearchService.Handler
{
    public class MovieCreatedEventHandler : IIntegrationEventHandler<MovieCreatedEvent>
    {
        private readonly ISearch _searchRepository;
        public MovieCreatedEventHandler(ISearch searchRepository)
        {
            _searchRepository = searchRepository;
        }
        public async Task Handle(MovieCreatedEvent @event)
        {
            var movieDocument = new SearchMovieDocument
            {
                MovieId = @event.MovieId,
                Title = @event.Title,
                Description = @event.Description,
                Director = @event.Director,
                Genre = @event.Genre,
                ReleaseDate = @event.ReleaseDate
            };

            await _searchRepository.IndexMovieAsync(movieDocument);
        }
    }
}
