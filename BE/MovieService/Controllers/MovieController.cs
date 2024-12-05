using Microsoft.AspNetCore.Mvc;
using MovieService.Data;
using MovieService.Events;
using MovieService.Models;
using MovieService.Repositories;
using SharedLibrary.EventBus;

[ApiController]
[Route("api/[controller]")]
public class MovieController : ControllerBase
{
    private readonly MovieDbContext _context;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IEventBus _eventBus;
    private readonly IMovie _movieRepo;

    public MovieController(MovieDbContext context, IHttpClientFactory httpClientFactory, IEventBus eventBus, IMovie movieRepo)
    {
        _context = context;
        _httpClientFactory = httpClientFactory;
        _eventBus = eventBus;
        _movieRepo = movieRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllMovies()
    {
        var movies = await _movieRepo.GetAllMoviesAsync();
        return Ok(movies);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMovie(int id, [FromQuery] string userId)
    {
        var movie = await _movieRepo.GetMovieAsync(id, userId);
        if (movie == null)
        {
            return NotFound();
        }
        return Ok(movie);
    }

    [HttpPost]
    public async Task<IActionResult> CreateMovie(Movie movie)
    {
        await _movieRepo.AddMovieAsync(movie);
        return CreatedAtAction(nameof(GetMovie), new { id = movie.MovieId }, movie);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMovie(int id, Movie movie)
    {
        if (id != movie.MovieId) return BadRequest();
        await _movieRepo.UpdateMovieAsync(movie);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        await _movieRepo.DeleteMovieAsync(id);
        return NoContent();
    }

    [HttpGet("trending")]
    public async Task<IActionResult> GetTrendingMovies()
    {
        var movies = await _movieRepo.GetTrendingMoviesAsync();
        return Ok(movies);
    }
}
