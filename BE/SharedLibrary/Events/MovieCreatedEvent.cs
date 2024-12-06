using SharedLibrary.Integration;

namespace MovieService.Events
{
    public class MovieCreatedEvent : IntegrationEvent
    {
        public int MovieId { get; }
        public string Title { get; }
        public string Description { get; }
        public string? Director { get; }
        public string? Genre { get; }
        public DateTime ReleaseDate { get; }

        public MovieCreatedEvent(int movieId, string title, string description, string? director, string? genre, DateTime releaseDate)
        {
            MovieId = movieId;
            Title = title;
            Description = description;
            Director = director;
            Genre = genre;
            ReleaseDate = releaseDate;
        }
    }
}
