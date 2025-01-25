using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.ML.Trainers;

namespace RecommendationService.MLModels.Training;

public class ModelTrainer
{
    public static void TrainAndSaveModel()
    {
        // 1. Tạo môi trường ML.NET
        var mlContext = new MLContext();

        // 2. Tải dữ liệu từ file CSV
        var dataPath = "MLModels/Data/data.csv";
        var dataView = mlContext.Data.LoadFromTextFile<MovieRating>(
            dataPath,
            hasHeader: true,
            separatorChar: ',');

        // 3. Xây dựng pipeline huấn luyện
        var pipeline = mlContext.Transforms.Conversion.MapValueToKey("UserIdEncoded", "UserId")
            .Append(mlContext.Transforms.Conversion.MapValueToKey("MovieIdEncoded", "MovieId"))
            .Append(mlContext.Recommendation().Trainers.MatrixFactorization(new MatrixFactorizationTrainer.Options
            {
                MatrixColumnIndexColumnName = "UserIdEncoded",
                MatrixRowIndexColumnName = "MovieIdEncoded",
                LabelColumnName = "Rating",
                NumberOfIterations = 20,
                ApproximationRank = 100
            }));

        // 4. Huấn luyện mô hình
        Console.WriteLine("Đang huấn luyện mô hình...");
        var model = pipeline.Fit(dataView);

        // 5. Lưu mô hình đã huấn luyện thành file ZIP
        var modelPath = "MLModels/model.zip";
        mlContext.Model.Save(model, dataView.Schema, modelPath);
        Console.WriteLine($"Mô hình đã được lưu tại: {modelPath}");
    }
    
    private class MovieRating
    {
        [LoadColumn(0)] public string UserId { get; set; }
        [LoadColumn(1)] public string MovieId { get; set; }
        [LoadColumn(2)] public string Genre { get; set; }
        [LoadColumn(3)] public float Rating { get; set; }
    }
}