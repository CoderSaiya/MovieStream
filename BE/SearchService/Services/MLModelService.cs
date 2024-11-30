using Microsoft.EntityFrameworkCore;
using Microsoft.ML;
using SearchService.Models;

namespace SearchService.Services;

public class MLModelService
{
    private readonly MLContext _mlContext;
    private readonly ITransformer _model;

    public MLModelService()
    {
        _mlContext = new MLContext();

        var data = new[]
        {
            new SearchData { Query = "action", Title = "The Dark Knight", Genre = "Action", RelevanceScore = 1 },
            new SearchData { Query = "sci-fi", Title = "Inception", Genre = "Sci-Fi", RelevanceScore = 1 },
            new SearchData { Query = "romantic", Title = "Titanic", Genre = "Romance", RelevanceScore = 1 }
        };
        var trainingData = _mlContext.Data.LoadFromEnumerable(data);

        var pipeline = _mlContext.Transforms.Conversion.MapValueToKey("Label", nameof(SearchData.RelevanceScore))
            .Append(_mlContext.Transforms.Text.FeaturizeText("Features", nameof(SearchData.Query)))
            .Append(_mlContext.Transforms.Concatenate("Features", "Features"))
            .Append(_mlContext.Regression.Trainers.Sdca(labelColumnName: "Label", featureColumnName: "Features"));

        _model = pipeline.Fit(trainingData);
    }

    public IEnumerable<SearchResult> Predict(string query)
    {
        var predictionEngine = _mlContext.Model.CreatePredictionEngine<SearchData, SearchResult>(_model);

        var predictions = new[]
        {
            new SearchData { Query = query, Title = "The Dark Knight", Genre = "Action" },
            new SearchData { Query = query, Title = "Inception", Genre = "Sci-Fi" },
            new SearchData { Query = query, Title = "Titanic", Genre = "Romance" }
        };

        return predictions.Select(p =>
        {
            var result = predictionEngine.Predict(p);
            return new SearchResult { Title = p.Title, Genre = p.Genre, Score = result.Score };
        }).OrderByDescending(r => r.Score);
    }
}
