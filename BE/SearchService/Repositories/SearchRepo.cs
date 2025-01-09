using Elastic.Clients.Elasticsearch;
using Elastic.Clients.Elasticsearch.QueryDsl;
using SearchService.DTOs;

namespace SearchService.Repositories
{
    public class SearchRepo : ISearch
    {
        private readonly Elastic.Clients.Elasticsearch.ElasticsearchClient _client;
        public SearchRepo(ElasticsearchClient client)
        {
            _client = client.Client;
        }
        public async Task IndexMovieAsync(object movieDocument)
        {
            await _client.IndexAsync(movieDocument, idx => idx.Index("movies"));
        }
        public async Task<SearchResponse<SearchMovieDocument>> SearchMoviesAsync(string query, string genre = null, int? year = null)
        {
            var boolQuery = new BoolQuery
            {
                Must = new List<Query>()
            };

            if (!string.IsNullOrEmpty(query))
            {
                boolQuery.Must.Add(new MatchQuery
                {
                    Field = Infer.Field<SearchMovieDocument>(f => f.Title),
                    Query = query
                });
            }

            if (!string.IsNullOrEmpty(genre))
            {
                boolQuery.Filter = boolQuery.Filter ?? new List<Query>();
                boolQuery.Filter.Add(new TermQuery
                {
                    Field = Infer.Field<SearchMovieDocument>(f => f.Genre),
                    Value = genre
                });
            }

            if (year.HasValue)
            {
                boolQuery.Filter = boolQuery.Filter ?? new List<Query>();
                boolQuery.Filter.Add(new TermQuery
                {
                    Field = Infer.Field<SearchMovieDocument>(f => f.ReleaseDate),
                    Value = year.Value
                });
            }

            var searchResponse = await _client.SearchAsync<SearchMovieDocument>(s => s
                                              .Index("movies")
                                              .Query(q => q.Bool(boolQuery))
            );

            if (!searchResponse.IsValidResponse)
            {
                throw new Exception($"Failed to search movies: {searchResponse.DebugInformation}");
            }

            return searchResponse;
        }
        public async Task DeleteMovieAsync(string movieId)
        {
            await _client.DeleteAsync<SearchMovieDocument>(movieId, d => d.Index("movies"));
        }
    }
}
