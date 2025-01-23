using Microsoft.AspNetCore.Mvc;
using MovieService.Repositories;
using MovieService.DTOs;

[ApiController]
[Route("api/[controller]")]
public class MovieController : ControllerBase
{
    private readonly IMovie _movieRepo;
    private readonly CloudStorageService _cloudStorageService;

    public MovieController(IMovie movieRepo, CloudStorageService cloudStorageService)
    {
        _movieRepo = movieRepo;
        _cloudStorageService = cloudStorageService;
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
    public async Task<IActionResult> CreateMovie([FromBody] CreateMovieReq createMovieReq, [FromForm] IFormFile video, [FromForm] List<IFormFile> images)
    {
        if (video == null || video.Length == 0)
            return BadRequest("Invalid video file.");
        if (images == null || !images.Any())
            return BadRequest("At least one image is required.");
        try
        {
            using var videoStream = video.OpenReadStream();
            var imageStreams = images.Select(img => new ImageFileData(img, img.OpenReadStream())).ToList();

            int id = await _movieRepo.AddMovieAsync(createMovieReq.MovieDto, createMovieReq.GenreIds, createMovieReq.StudioIds, videoStream, imageStreams);
            return CreatedAtAction(nameof(GetMovie), new { id = id });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error uploading video or images: {ex.Message}");
        }
    }

    [HttpPost("private/genre")]
    public async Task<IActionResult> CreateGenre(string nameGenre)
    {
        if (nameGenre.Length == 0)
            return BadRequest("Invalid genre.");
        try
        {
            int id = await _movieRepo.AddGenreAsync(nameGenre);
            return Ok(new { id = id });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
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

    [HttpGet("public/stream/{id}")]
    public async Task<IActionResult> GetStreamMovie([FromForm] int movieId)
    {
        var existingMovie = await _movieRepo.GetMovieByIdAsync(movieId);
        if(existingMovie == null)
        {
            return NoContent();
        }

        var streamURL = _cloudStorageService.GeneratePreSignedUrl(existingMovie.Title);
        return Ok(new { URL = streamURL });
    }
}
