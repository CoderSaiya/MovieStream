using MovieService.DTOs;
using MovieService.Models;

namespace MovieService.Repositories
{
    public interface IMovie
    {
        Task<Movie?> GetMovieAsync(int id, string userId);
        Task<List<Movie>> GetAllMoviesAsync();
        Task<int> AddMovieAsync(MovieDTO movieDTO, List<int> genreIds, List<string> imageUrls, List<int> studioIds);
        Task<bool> LoadListToElastic();
        Task UpdateMovieAsync(int movieId, MovieDTO movieDto);
        Task DeleteMovieAsync(int id);
        Task<List<Movie>> GetTrendingMoviesAsync();
        Task<bool> CheckVipStatusAsync(string userId);
    }
}
