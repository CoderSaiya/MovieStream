using RecommendationService.Models;

namespace RecommendationService.Services;

public interface IRecommendation
{
    List<PredictionResult> Recommend(string userId, List<string> movieIds);
}