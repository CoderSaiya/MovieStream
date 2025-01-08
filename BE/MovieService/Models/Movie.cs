using MovieService.DTOs;
using System.ComponentModel.DataAnnotations;

namespace MovieService.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = null!;
        public string AlternateTitle { get; set; } = string.Empty;
        public string CoverImage { get; set; } = string.Empty;
        public double Rating { get; set; } = 0.0;
        public int TotalRatings { get; set; } = 0;

        public string Synopsis { get; set; } = string.Empty;
        public string? Director { get; set; }
        public string? Genre { get; }
        public int ViewCount { get; set; } = 0;
        public string Schedule { get; set; } = string.Empty;
        public string AgeRating { get; set; } = string.Empty;
        public string Language { get; set; } = string.Empty;
        public string Season { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public int followers { get; set; } = 0;

        [Required]
        public QualityLevel Quality { get; set; } = QualityLevel.Low;

        public bool IsVipOnly { get; set; } = false;

        [Required]
        public string FileUrl { get; set; } = null!;

        public DateTime ReleaseDate { get; set; } = DateTime.Now;
        public string Status {  get; set; } = string.Empty;

        public ICollection<Episode> Episodes { get; set; } = new List<Episode>();
        public ICollection<Image> Images { get; set; } = new List<Image>();
        public ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();
        public ICollection<MovieStudio> MovieStudios { get; set; } = new List<MovieStudio>();
    }
}
