using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MovieService.Data;
using MovieService.DTOs;
using MovieService.Events;
using MovieService.Models;
using SharedLibrary.EventBus;
using SharedLibrary.Events;

namespace MovieService.Repositories
{
    public class MovieRepo : IMovie
    {
        private readonly MovieDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IEventBus _eventBus;

        public MovieRepo(MovieDbContext context, IHttpClientFactory httpClientFactory, IEventBus eventBus)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
            _eventBus = eventBus;
        }

        private async Task<Movie?> GetMovieByIdAsync(int id)
        {
            return await _context.Movies.FindAsync(id);
        }
        public async Task AddMovieAsync(Movie movie)
        {
            await _context.Movies.AddAsync(movie);
            await _context.SaveChangesAsync();
            var @event = new MovieCreatedEvent(movie.Id, movie.Title, movie.Synopsis, movie.Director, movie.Genre, movie.ReleaseDate);
            _eventBus.Publish(@event);
        }

        public async Task<List<Movie>> GetAllMoviesAsync()
        {
            return await _context.Movies.ToListAsync();
        }

        public async Task<Movie?> GetMovieAsync(int id, string userId)
        {
            var movie = await GetMovieByIdAsync(id);
            if (movie == null) return null;

            var isVip = await CheckVipStatusAsync(userId);
            if (!isVip)
            {
                movie.FileUrl = LimitVideoQuality(movie.FileUrl);
            }

            RecordMovieView(id, userId);
            return movie;

        }

        public async Task<bool> CheckVipStatusAsync(string userId)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"https://authservice/checkvip?userId={userId}");
            if (!response.IsSuccessStatusCode)
            {
                return false;
            }

            return await response.Content.ReadFromJsonAsync<bool>();
        }

        private string LimitVideoQuality(string url)
        {
            return url.Replace("high", "low");
        }

        public void RecordMovieView(int movieId, string userId)
        {
            var @event = new MovieViewedIntegrationEvent(movieId, userId);
            _eventBus.Publish(@event);
        }

        public async Task UpdateMovieAsync(int movieId, MovieUpdateDTO movieUpdateDto)
        {
            var movie = await _context.Movies.FindAsync(movieId);
            if (movie == null)
            {
                throw new KeyNotFoundException($"Movie with ID {movieId} not found.");
            }

            var props = typeof(MovieUpdateDTO).GetProperties();
            foreach (var prop in props)
            {
                var newValue = prop.GetValue(movieUpdateDto);
                if (newValue != null && !string.IsNullOrEmpty(newValue?.ToString()))
                {
                    var movieProperty = typeof(Movie).GetProperty(prop.Name);
                    movieProperty?.SetValue(movie, newValue);
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeleteMovieAsync(int id)
        {
            var movie = await GetMovieByIdAsync(id);
            if (movie != null)
            {
                _context.Movies.Remove(movie);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Movie>> GetTrendingMoviesAsync()
        {
            return await _context.Movies.OrderByDescending(m => m.ViewCount).Take(10).ToListAsync();
        }
    }
}
