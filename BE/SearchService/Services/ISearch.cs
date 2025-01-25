using SearchService.DTOs;
using Elastic.Clients.Elasticsearch;
using SharedLibrary.Events;

namespace SearchService.Services
{
    public interface ISearch
    {
        Task IndexMovieAsync(object movieDocument);
        Task CreateIndex(string index);
        Task<SearchResponse<SearchMovieDocument>> SearchMoviesAsync(string query, bool filterByGenre = false, string genre = null, int? year = null);
        Task DeleteMovieAsync(string movieId);
        Task<bool> AddOrUpdateMovie(MovieDocument movie);
    }
}
