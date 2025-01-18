using MovieService.DTOs;
using MovieService.Models;

namespace MovieService.Repositories
{
    public interface IMovie
    {
        Task<Movie?> GetMovieAsync(int id, string userId);
        Task<Movie?> GetMovieByIdAsync(int id);
        Task<List<Movie>> GetAllMoviesAsync();
        Task<int> AddMovieAsync(MovieDTO movieDto, List<int> genreIds, List<string> imageUrls, List<int> studioIds, Stream videoStream);
        Task<bool> LoadListToElastic();
        Task UpdateMovieAsync(int movieId, MovieDTO movieDto);
        Task DeleteMovieAsync(int id);
        Task<List<Movie>> GetTrendingMoviesAsync();
        Task<bool> CheckVipStatusAsync(string userId);
    }
}
