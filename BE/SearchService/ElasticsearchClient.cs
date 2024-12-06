using Nest;

namespace SearchService
{
    public class ElasticsearchClient
    {
        private readonly ElasticClient _client;
        public ElasticsearchClient(IConfiguration configuration)
        {
            var settings = new ConnectionSettings(new Uri(configuration["Elasticsearch:Uri"]))
                .DefaultIndex("movies");
            _client = new ElasticClient(settings);
        }
        public ElasticClient Client => _client;
    }
}
