using Microsoft.AspNetCore.Mvc;
using SearchService.Services;

namespace SearchService.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{
    private readonly MLModelService _mlModelService;

    public SearchController(MLModelService mlModelService)
    {
        _mlModelService = mlModelService;
    }

    [HttpGet]
    public IActionResult Search([FromQuery] string query)
    {
        var results = _mlModelService.Predict(query);
        return Ok(results);
    }
}
