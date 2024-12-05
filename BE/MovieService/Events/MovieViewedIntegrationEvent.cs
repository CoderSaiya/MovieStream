using SharedLibrary.Integration;

namespace MovieService.Events
{
    public class MovieViewedIntegrationEvent : IntegrationEvent {
        public int MovieId { get; } 
        public string UserId { get; } 
        public MovieViewedIntegrationEvent(int movieId, string userId) {
            MovieId = movieId; 
            UserId = userId; 
        } 
    }
}
