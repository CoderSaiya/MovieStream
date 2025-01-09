using Elastic.Clients.Elasticsearch;
using Elastic.Transport;

namespace SearchService
{
    public class ElasticsearchClient
    {
        private readonly Elastic.Clients.Elasticsearch.ElasticsearchClient _client;

        public ElasticsearchClient(IConfiguration configuration)
        {
            var uri = configuration["Elasticsearch:Uri"];
            var defaultIndex = configuration["Elasticsearch:DefaultIndex"];
            var username = configuration["Elasticsearch:Username"];
            var password = configuration["Elasticsearch:Password"];
            var fingerprint = configuration["Elasticsearch:CertificateFingerprint"];

            var settings = new ElasticsearchClientSettings(new Uri(uri))
                .DefaultIndex(defaultIndex)
                .CertificateFingerprint(fingerprint)
                .Authentication(new BasicAuthentication(username, password));

            _client = new Elastic.Clients.Elasticsearch.ElasticsearchClient(settings);
        }

        public Elastic.Clients.Elasticsearch.ElasticsearchClient Client => _client;
    }
}
