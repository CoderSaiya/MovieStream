﻿using Microsoft.AspNetCore.Mvc;
using SearchService.Services;

namespace SearchService.Controllers
{
    public class SearchController : Controller
    {
        private readonly ISearch _searchService;

        public SearchController(ISearch searchService)
        {
            _searchService = searchService;
        }

        [HttpGet("public")]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            var response = await _searchService.SearchMoviesAsync(query);
            if (response == null)
            {
                return StatusCode(500, response.DebugInformation);
            }

            return Ok(response);
        }
    }
}
