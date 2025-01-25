using SearchService.Services;
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
            var movieDocument = new MovieDocument
            {
                Id = @event.MovieId,
                MainImage = @event.MainImage,
                Title = @event.Title,
                Description = @event.Description,
                Genre = @event.Genre,
                ReleaseDate = @event.ReleaseDate
            };

            await _searchRepository.CreateIndex("movies");
            await _searchRepository.AddOrUpdateMovie(movieDocument);
        }
    }
}
