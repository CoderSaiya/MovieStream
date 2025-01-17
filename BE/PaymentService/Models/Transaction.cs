using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaymentService.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public int GenreId { get; set; }
        [ForeignKey("GenreId")]
        public Genre Genre { get; set; } = null!;
        public double Amount { get; set; } = 0.0;
        public string Description { get; set; } = null!;
        public DateTime CreateAt { get; set; } = DateTime.Now;
    }
}
