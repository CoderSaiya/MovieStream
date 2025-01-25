using SearchService.Services;
using SharedLibrary.Events;
using SharedLibrary.Integration;

namespace SearchService.RabbitMQ
{
    public class SyncMovieHandler : IIntegrationEventHandler<SyncElasticEvent>
    {
        private readonly ISearch _searchService;

        public SyncMovieHandler(ISearch searchService)
        {
            _searchService = searchService;
        }

        public Task Handle(SyncElasticEvent @event)
        {
            foreach (var movieDocument in @event.GetList())
            {
                _searchService.AddOrUpdateMovie(new MovieDocument
                {
                    Id = movieDocument.Id,
                    MainImage = movieDocument.MainImage,
                    Title = movieDocument.Title,
                    Genre = movieDocument.Genre,
                    ReleaseDate = movieDocument.ReleaseDate,
                    Description = movieDocument.Description,
                });
            }
            

            return Task.CompletedTask;
        }
    }
}
