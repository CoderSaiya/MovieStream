using SharedLibrary.RabbitMQ.Integration;

namespace SharedLibrary.RabbitMQ.Events
{
    public class SyncElasticEvent : IntegrationEvent
    {
        public List<MovieDocument> Movies { get; set; }

        public SyncElasticEvent()
        {
            Movies = new List<MovieDocument>();
        }

        public List<MovieDocument> GetList() => Movies;
    }

    public class MovieDocument
    {
        public int Id { get; set; }
        public string MainImage { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Description { get; set; }
    }
}
