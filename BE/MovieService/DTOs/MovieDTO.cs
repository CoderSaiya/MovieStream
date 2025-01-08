namespace MovieService.DTOs
{
    public class MovieDTO
    {
        public string Title { get; set; } = null!;
        public string AlternateTitle { get; set; } = string.Empty;
        public string CoverImage { get; set; } = string.Empty;
        public double Rating { get; set; } = 0.0;
        public string Synopsis { get; set; } = string.Empty;
        public string? Director { get; set; }
        public int ViewCount { get; set; } = 0;
        public string Schedule { get; set; } = string.Empty;
        public string AgeRating { get; set; } = string.Empty;
        public string Season { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public int followers { get; set; } = 0;
        public QualityLevel Quality { get; set; } = QualityLevel.Low;
        public bool IsVipOnly { get; set; } = false;
        public string FileUrl { get; set; } = null!;
        public DateTime ReleaseDate { get; set; } = DateTime.Now;
        public string Status { get; set; } = string.Empty;
    }
}
