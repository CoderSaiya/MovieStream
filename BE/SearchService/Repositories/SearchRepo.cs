using Elastic.Clients.Elasticsearch;
using Nest;
using SearchService.DTOs;

namespace SearchService.Repositories
{
    public class SearchRepo : ISearch
    {
        private readonly ElasticClient _client;
        public SearchRepo(ElasticsearchClient client)
        {
            _client = client.Client;
        }
        public async Task IndexMovieAsync(object movieDocument)
        {
            await _client.IndexAsync(movieDocument, idx => idx.Index("movies"));
        }
        public async Task<ISearchResponse<SearchMovieDocument>> SearchMoviesAsync(string query, string genre = null, int? year = null)
        {
            var searchResponse = await _client.SearchAsync<SearchMovieDocument>(s => s
                .Index("movies")
                .Query(q => q
                    .Bool(b => b
                        .Must(
                            q => q.Match(m => m.Field(f => f.Title).Query(query)),
                            q => genre != null ? q.Term(t => t.Field(f => f.Genre).Value(genre)) : null,
                            q => year != null ? q.Term(t => t.Field(f => f.ReleaseDate).Value(year)) : null
                        )
                    )
                )
            );

            return searchResponse;
        }
        public async Task DeleteMovieAsync(string movieId)
        {
            await _client.DeleteAsync<SearchMovieDocument>(movieId, d => d.Index("movies"));
        }
    }
}
