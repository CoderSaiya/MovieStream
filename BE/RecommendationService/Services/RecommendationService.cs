using Microsoft.ML;
using RecommendationService.Models;

namespace RecommendationService.Services;

public class RecommendationService : IRecommendation
{
    private readonly MLContext _mlContext;
    private readonly ITransformer _mlModel;

    public RecommendationService()
    {
        _mlContext = new MLContext();
        _mlModel = _mlContext.Model.Load("model.zip", out _);
    }
    public List<PredictionResult> Recommend(string userId, List<string> movieIds)
    {
        var predictionEngine = _mlContext.Model.CreatePredictionEngine<MovieRating, MovieRatingPrediction>(_mlModel);
        
        var recommendations = new List<PredictionResult>();
        foreach (var movieId in movieIds)
        {
            var input = new MovieRating
            {
                UserId = userId,
                MovieId = movieId
            };

            var prediction = predictionEngine.Predict(input);
            recommendations.Add(new PredictionResult
            {
                MovieId = movieId,
                Score = prediction.Score
            });
        }

        return recommendations.OrderByDescending(r => r.Score).ToList();
    }
}