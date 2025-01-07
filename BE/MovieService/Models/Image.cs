using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MovieService.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int MovieId { get; set; }

        [ForeignKey("MovieId")]
        public Movie Movie { get; set; } = null!;

        [Required]
        public string Url { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
    }
}
