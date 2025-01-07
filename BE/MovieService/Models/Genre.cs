using System.ComponentModel.DataAnnotations;

namespace MovieService.Models
{
    public class Genre
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();
    }
}
