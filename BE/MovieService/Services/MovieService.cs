using Microsoft.EntityFrameworkCore;
using MovieService.Data;
using MovieService.DTOs;
using MovieService.Handlers;
using MovieService.Models;
using SharedLibrary.Classes;
using SharedLibrary.EventBus;
using SharedLibrary.Events;
using System.Linq.Dynamic.Core;

namespace MovieService.Repositories
{
    public class MovieService : IMovie
    {
        private readonly MovieDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IEventBus _eventBus;
        private readonly CloudStorageService _storageService;

        public MovieService(MovieDbContext context, IHttpClientFactory httpClientFactory, IEventBus eventBus, CloudStorageService storageService)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
            _eventBus = eventBus;
            _storageService = storageService;
        }

        public async Task<Movie?> GetMovieByIdAsync(int id)
        {
            return await _context.Movies
                .Include(m => m.MovieGenres)
                .Include(m => m.MovieStudios)
                .Include(m => m.Episodes)
                .Include(m => m.Images)
                .FirstOrDefaultAsync(m => m.Id == id);
        }
        public async Task<int> AddMovieAsync(MovieDTO movieDto, List<int> genreIds, List<int> studioIds, Stream videoStream, List<ImageFileData> imageFiles)
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
                    Rating = movieDto.Rating,
                    Synopsis = movieDto.Synopsis,
                    Director = movieDto.Director,
                    ViewCount = movieDto.ViewCount,
                    Schedule = movieDto.Schedule,
                    AgeRating = movieDto.AgeRating,
                    Season = movieDto.Season,
                    Country = movieDto.Country,
                    Followers = movieDto.Followers,
                    Quality = movieDto.Quality,
                    IsVipOnly = movieDto.IsVipOnly,
                    ReleaseDate = movieDto.ReleaseDate,
                    Status = movieDto.Status,
                };

                foreach (var genre in genres)
                {
                    movie.MovieGenres.Add(new MovieGenre { GenreId = genre.Id });
                }

                foreach (var studio in studios)
                {
                    movie.MovieStudios.Add(new MovieStudio { StudioId = studio.Id });
                }

                var uploadedImages = new List<string>();
                foreach (var imageFile in imageFiles)
                {
                    var imageUrl = await _storageService.UploadImageAsync(imageFile.Stream, $"{Guid.NewGuid()}_{imageFile.File.FileName}");
                    uploadedImages.Add(imageUrl);
                    movie.Images.Add(new Image { Url = imageUrl });
                }

                if (uploadedImages.Any())
                {
                    movie.CoverImage = uploadedImages.First();
                }

                var videoUrl = await _storageService.UploadVideoAsync(videoStream, $"{Guid.NewGuid()}_{movie.Title.Replace(" ", "_")}.mp4");
                movie.FileUrl = videoUrl;

                await _context.Movies.AddAsync(movie);
                await _context.SaveChangesAsync();

                var @event = new MovieCreatedEvent(
                    movie.Id,
                    movie.CoverImage,
                    movie.Title,
                    movie.Synopsis,
                    string.Join(", ", genres.Select(g => g.Name)),
                    movie.ReleaseDate
                );
                _eventBus.Publish(@event);

                await transaction.CommitAsync();
                return movie.Id;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw new Exception("An error occurred during processing.");
            }
        }

        public async Task<int> AddGenreAsync(string name)
        {
            try
            {
                var genre = new Genre { Name = name };
                await _context.Genres.AddAsync(genre);
                await _context.SaveChangesAsync();

                return genre.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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

        public async Task<bool> LoadListToElastic()
        {
            var latestMovies = await GetAllMoviesAsync();
            if (latestMovies != null)
            {
                return false;
            }

            var eventMessage = new SyncElasticEvent
            {
                Movies = latestMovies.Select(m => new MovieDocument
                {
                    Id = m.Id,
                    MainImage = m.Images.FirstOrDefault()?.Url ?? string.Empty,
                    Title = m.Title,
                    Genre = string.Join(", ", m.MovieGenres.Select(g => g.Genre.Name)),
                    ReleaseDate = m.ReleaseDate,
                    Description = m.Synopsis
                }).ToList()
            };

            _eventBus.Publish(eventMessage);

            return true;
        }

        public async Task<PageResult<Movie>> GetPagedMovieAsync(PagingReq request)
        {
            var query = _context.Movies
                .Include(m => m.MovieGenres)
                .Include(m => m.MovieStudios)
                .Include(m => m.Episodes)
                .Include(m => m.Images)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.SortBy))
            {
                var isDescending = request.SortOrder.Equals("desc", StringComparison.OrdinalIgnoreCase);
                query = query.OrderBy($"{request.SortBy} {(isDescending ? "descending" : "ascending")}");
            }

            var totalItems = await query.CountAsync();
            var items = await query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return new PageResult<Movie>
            {
                Items = items,
                TotalCount = totalItems,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };
        }
    }
}
