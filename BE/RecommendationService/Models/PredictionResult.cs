﻿namespace RecommendationService.Models;

public class PredictionResult
{
    public string MovieId { get; set; }
    public float Score { get; set; }
}