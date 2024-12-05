using MovieService.Models;

namespace MovieService.Repositories
{
    public interface IMovie
    {
        Task<Movie?> GetMovieAsync(int id, string userId);
        Task<List<Movie>> GetAllMoviesAsync();
        Task AddMovieAsync(Movie movie);
    }
}
