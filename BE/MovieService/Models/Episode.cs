using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MovieService.Models
{
    public class Episode
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int MovieId { get; set; }

        [ForeignKey("MovieId")]
        public Movie Movie { get; set; } = null!;

        [Required]
        public int CurrentEpisode { get; set; }

        [Required]
        public int TotalEpisodes { get; set; }
    }
}
