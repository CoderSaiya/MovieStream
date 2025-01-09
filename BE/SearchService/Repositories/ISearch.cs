using SearchService.DTOs;
using Elastic.Clients.Elasticsearch;

namespace SearchService.Repositories
{
    public interface ISearch
    {
        Task IndexMovieAsync(object movieDocument);
        Task<SearchResponse<SearchMovieDocument>> SearchMoviesAsync(string query, string genre = null, int? year = null);
        Task DeleteMovieAsync(string movieId);
    }
}
