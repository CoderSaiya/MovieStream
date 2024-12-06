using Nest;

namespace SearchService
{
    public class ElasticsearchClient
    {
        private readonly ElasticClient _client;
        public ElasticsearchClient(IConfiguration configuration)
        {
            var setting = new ConnectionSettings(new Uri(configuration["Elasticsearch:Uri"]))
                .DefaultIndex("movies");
            _client = new ElasticClient(setting);
        }
        public ElasticClient Client => _client;
    }
}
