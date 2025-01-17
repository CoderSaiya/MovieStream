using Microsoft.EntityFrameworkCore;
using PaymentService.Models;

namespace PaymentService.Data
{
    public class PaymentDbContext : DbContext
    {
        public PaymentDbContext(DbContextOptions<PaymentDbContext> options) : base(options) { }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Genre> Genre { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Transaction>().HasKey(t  => t.Id);
            modelBuilder.Entity<Genre>().HasKey(g => g.Id);

            modelBuilder.Entity<Genre>()
                .HasMany(t => t.Transactions)
                .WithOne(t => t.Genre)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
