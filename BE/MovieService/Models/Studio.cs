using System.ComponentModel.DataAnnotations;

namespace MovieService.Models
{
    public class Studio
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public ICollection<MovieStudio> MovieStudios { get; set; } = new List<MovieStudio>();
    }
}
