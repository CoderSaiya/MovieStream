﻿using Microsoft.AspNetCore.Mvc;
using MovieService.Data;
using SharedLibrary.Events;
using MovieService.Models;
using MovieService.Repositories;
using SharedLibrary.EventBus;
using MovieService.DTOs;

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
    public async Task<IActionResult> CreateMovie(MovieDTO movieDto, List<int> genreIds, List<string> imageUrls, List<int> studioIds)
    {
        int id = await _movieRepo.AddMovieAsync(movieDto, genreIds, imageUrls, studioIds);
        return CreatedAtAction(nameof(GetMovie), new { id = id });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMovie(int id, MovieDTO movie)
    {
        await _movieRepo.UpdateMovieAsync(id, movie);
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
