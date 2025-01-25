using Microsoft.AspNetCore.Mvc;
using RecommendationService.MLModels.Training;
using RecommendationService.Services;

namespace RecommendationService.Controllers;

public class RecommendationController : Controller
{
    private readonly IRecommendation _recommendationService;

    public RecommendationController(IRecommendation recommendationService)
    {
        _recommendationService = recommendationService;
    }

    [HttpPost("private/train-model")]
    public IActionResult TrainModel()
    {
        try
        {
            ModelTrainer.TrainAndSaveModel();
            return Ok("Model trained and saved successfully!");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }

    [HttpGet("public/recommendation")]
    public IActionResult Recommendation(string userId, List<string> movieIds)
    {
        var result = _recommendationService.Recommend(userId, movieIds);
        if (result.Count == 0) return BadRequest("No recommendation was found");
        return Ok(result);
    }
}