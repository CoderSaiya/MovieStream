namespace MovieService.DTOs
{
    public class MovieUpdateDTO
    {
        public string? Title { get; set; }
        public string? AlternateTitle { get; set; }
        public string? CoverImage { get; set; }
        public double? Rating { get; set; }
        public string? Synopsis { get; set; }
        public string? Schedule { get; set; }
        public string? AgeRating { get; set; }
        public string? Season { get; set; }
        public string? Country { get; set; }
        public int? ViewCount { get; set; }
        public bool? IsVipOnly { get; set; }
        public string? FileUrl { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public string? Status { get; set; }
    }
}
