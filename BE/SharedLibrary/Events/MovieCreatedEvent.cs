using SharedLibrary.Integration;

namespace SharedLibrary.Events
{
    public class MovieCreatedEvent : IntegrationEvent
    {
        public int MovieId { get; }
        public string MainImage { get; }
        public string Title { get; }
        public string Description { get; }
        public string? Genre { get; }
        public DateTime ReleaseDate { get; }

        public MovieCreatedEvent(int movieId, string image, string title, string description, string? genre, DateTime releaseDate)
        {
            MovieId = movieId;
            MainImage = image;
            Title = title;
            Description = description;
            Genre = genre;
            ReleaseDate = releaseDate;
        }
    }
}
