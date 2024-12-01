using Microsoft.AspNetCore.Mvc;
using MovieService.Data;
using MovieService.Events;
using MovieService.Models;
using SharedLibrary;

[ApiController]
[Route("api/[controller]")]
public class MovieController : ControllerBase
{
    private readonly MovieDbContext _context;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IEventBus _eventBus;

    public MovieController(MovieDbContext context, IHttpClientFactory httpClientFactory, IEventBus eventBus)
    {
        _context = context;
        _httpClientFactory = httpClientFactory;
        _eventBus = eventBus;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMovie(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null)
        {
            return NotFound();
        }

        var client = _httpClientFactory.CreateClient();
        var response = await client.GetAsync("https://authservice/checkvip");
        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode);
        }

        var isVip = await response.Content.ReadFromJsonAsync<bool>();

        if (!isVip)
        {
            movie.FileUrl = LimitVideoQuality(movie.FileUrl);
        }

        var userId = "user123";
        var movieViewedEvent = new MovieViewedIntegrationEvent(movie.MovieId, userId);
        _eventBus.Publish(movieViewedEvent);

        return Ok(movie);
    }

    private string LimitVideoQuality(string url)
    {
        return url.Replace("high", "low");
    }

    [HttpPost]
    public IActionResult CreateMovie(Movie movie)
    {
        _context.Movies.Add(movie);
        _context.SaveChanges();

        var @event = new MovieCreatedIntegrationEvent(movie.MovieId, movie.Title);
        _eventBus.Publish(@event);

        return Ok(movie);
    }
}
