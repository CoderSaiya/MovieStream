using MovieService.DTOs;
using System.ComponentModel.DataAnnotations;

namespace MovieService.Models
{
    public class Movie
    {
        [Key]
        public int MovieId { get; set; }

        [Required]
        public string Title { get; set; } = null!;

        public string Description { get; set; } = string.Empty;
        public string? Director { get; }
        public string? Genre { get; }
        public int Views { get; set; } = 0;

        [Required]
        public QualityLevel Quality { get; set; } = QualityLevel.Low;

        public bool IsVipOnly { get; set; } = false;

        [Required]
        public string FileUrl { get; set; } = null!;

        public DateTime ReleaseDate { get; set; } = DateTime.Now;
    }
}
