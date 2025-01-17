using Microsoft.AspNetCore.Mvc;
using MovieService.Data;
using MovieService.Repositories;
using MovieService.DTOs;

[ApiController]
[Route("api/[controller]")]
public class MovieController : ControllerBase
{
    private readonly IMovie _movieRepo;

    public MovieController(IMovie movieRepo)
    {
        _movieRepo = movieRepo;
    }

    [HttpGet("public")]
    public async Task<IActionResult> GetAllMovies()
    {
        var movies = await _movieRepo.GetAllMoviesAsync();
        return Ok(movies);
    }

    [HttpGet("public/{id}")]
    public async Task<IActionResult> GetMovie(int id, [FromQuery] string userId)
    {
        var movie = await _movieRepo.GetMovieAsync(id, userId);
        if (movie == null)
        {
            return NotFound();
        }
        return Ok(movie);
    }

    [HttpPost("private")]
    public async Task<IActionResult> CreateMovie([FromBody] CreateMovieReq createMovieReq, [FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Invalid video file.");
        try
        {
            using var stream = file.OpenReadStream();
            int id = await _movieRepo.AddMovieAsync(createMovieReq.MovieDto, createMovieReq.GenreIds, createMovieReq.ImageUrls, createMovieReq.StudioIds, stream);
            return CreatedAtAction(nameof(GetMovie), new { id = id });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error uploading video: {ex.Message}");
        }
    }

    [HttpPut("private/{id}")]
    public async Task<IActionResult> UpdateMovie(int id, MovieDTO movie)
    {
        await _movieRepo.UpdateMovieAsync(id, movie);
        return NoContent();
    }

    [HttpDelete("private/{id}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        await _movieRepo.DeleteMovieAsync(id);
        return NoContent();
    }

    [HttpGet("public/trending")]
    public async Task<IActionResult> GetTrendingMovies()
    {
        var movies = await _movieRepo.GetTrendingMoviesAsync();
        return Ok(movies);
    }

    [HttpPost("sync-elastic")]
    public async Task<IActionResult> SyncElastic()
    {
        var result = await _movieRepo.LoadListToElastic();
        if(!result) return NoContent();
        return Ok("Movies sent to RabbitMQ for Elasticsearch sync.");
    }
}
