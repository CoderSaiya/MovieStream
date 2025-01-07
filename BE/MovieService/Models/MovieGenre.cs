using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MovieService.Models
{
    public class MovieGenre
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int MovieId { get; set; }

        [ForeignKey("MovieId")]
        public Movie Movie { get; set; } = null!;

        [Required]
        public int GenreId { get; set; }

        [ForeignKey("GenreId")]
        public Genre Genre { get; set; } = null!;
    }
}
