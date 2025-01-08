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
        public async Task<int> AddMovieAsync(MovieDTO movieDto, List<int> genreIds, List<string> imageUrls, List<int> studioIds)
        {
            var genres = await _context.Genres
                .Where(g => genreIds.Contains(g.Id))
                .ToListAsync();
            if (genres.Count != genreIds.Count)
            {
                throw new ArgumentException("One or more genres do not exist.");
            }

            var studios = await _context.Studios
                .Where(s => studioIds.Contains(s.Id))
                .ToListAsync();
            if (studios.Count != studioIds.Count)
            {
                throw new ArgumentException("One or more studios do not exist.");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var movie = new Movie
                {
                    Title = movieDto.Title,
                    AlternateTitle = movieDto.AlternateTitle,
                    CoverImage = movieDto.CoverImage,
                    Rating = movieDto.Rating,
                    Synopsis = movieDto.Synopsis,
                    Director = movieDto.Director,
                    ViewCount = movieDto.ViewCount,
                    Schedule = movieDto.Schedule,
                    AgeRating = movieDto.AgeRating,
                    Season = movieDto.Season,
                    Country = movieDto.Country,
                    followers = movieDto.followers,
                    Quality = movieDto.Quality,
                    IsVipOnly = movieDto.IsVipOnly,
                    FileUrl = movieDto.FileUrl,
                    ReleaseDate = movieDto.ReleaseDate,
                    Status = movieDto.Status
                };

                foreach (var genre in genres)
                {
                    movie.MovieGenres.Add(new MovieGenre { GenreId = genre.Id });
                }

                foreach (var studio in studios)
                {
                    movie.MovieStudios.Add(new MovieStudio { StudioId = studio.Id });
                }

                foreach (var imageUrl in imageUrls)
                {
                    movie.Images.Add(new Image { Url = imageUrl });
                }

                await _context.Movies.AddAsync(movie);
                await _context.SaveChangesAsync();

                var @event = new MovieCreatedEvent(
                movie.Id,
                movie.Title,
                movie.Synopsis,
                movie.Director,
                string.Join(", ", genres.Select(g => g.Name)),
                movie.ReleaseDate
            );
                _eventBus.Publish(@event);

                return movie.Id;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
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

        public async Task UpdateMovieAsync(int movieId, MovieDTO movieDto)
        {
            var movie = await _context.Movies.FindAsync(movieId);
            if (movie == null)
            {
                throw new KeyNotFoundException($"Movie with ID {movieId} not found.");
            }
            
            var props = typeof(MovieDTO).GetProperties();
            foreach (var prop in props)
            {
                var newValue = prop.GetValue(movieDto);
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
