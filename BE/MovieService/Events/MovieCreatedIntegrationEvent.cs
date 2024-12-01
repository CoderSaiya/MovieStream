namespace MovieService.Events
{
    public class MovieCreatedIntegrationEvent : IntegrationEvent
    {
        public int MovieId { get; }
        public string Title { get; }

        public MovieCreatedIntegrationEvent(int movieId, string title)
        {
            MovieId = movieId;
            Title = title;
        }
    }
}
