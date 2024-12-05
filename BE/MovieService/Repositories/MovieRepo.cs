using Microsoft.EntityFrameworkCore;
using MovieService.Data;
using MovieService.Events;
using MovieService.Models;
using SharedLibrary.EventBus;

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
        public async Task AddMovieAsync(Movie movie)
        {
            await _context.Movies.AddAsync(movie);
            await _context.SaveChangesAsync();
            var @event = new MovieCreatedIntegrationEvent(movie.MovieId, movie.Title);
            _eventBus.Publish(@event);
        }

        public async Task<List<Movie>> GetAllMoviesAsync()
        {
            return await _context.Movies.ToListAsync();
        }

        public async Task<Movie?> GetMovieAsync(int id, string userId)
        {
            var movie = await _context.Movies.FindAsync(id);
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
    }
}
