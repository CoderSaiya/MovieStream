using MovieService.DTOs;
using MovieService.Models;
using SharedLibrary.DTOs;

namespace MovieService.Services
{
    public interface IMovie
    {
        Task<Movie?> GetMovieAsync(int id, string userId);
        Task<Movie?> GetMovieByIdAsync(int id);
        Task<List<Movie>> GetAllMoviesAsync();
        Task<int> AddMovieAsync(MovieDTO movieDto, List<int> genreIds, List<int> studioIds, Stream videoStream, List<ImageFileData> imageFiles);
        Task<int> AddGenreAsync(string name);
        Task<bool> LoadListToElastic();
        Task UpdateMovieAsync(int movieId, MovieDTO movieDto);
        Task DeleteMovieAsync(int id);
        Task<List<Movie>> GetTrendingMoviesAsync();
        Task<bool> CheckVipStatusAsync(string userId);
        Task<PageResult<Movie>> GetPagedMovieAsync(PagingReq request);
    }
}
