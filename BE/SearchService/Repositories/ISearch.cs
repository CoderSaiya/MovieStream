
using Nest;
using SearchService.DTOs;

namespace SearchService.Repositories
{
    public interface ISearch
    {
        Task IndexMovieAsync(object movieDocument);
        Task<ISearchResponse<SearchMovieDocument>> SearchMoviesAsync(string query, string genre = null, int? year = null);
        Task DeleteMovieAsync(string movieId);
    }
}
