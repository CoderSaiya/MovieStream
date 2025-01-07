using Microsoft.EntityFrameworkCore;
using MovieService.Models;

namespace MovieService.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options) { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Episode> Episodes { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Studio> Studios { get; set; }
        public DbSet<MovieGenre> MovieGenres { get; set; }
        public DbSet<MovieStudio> MovieStudios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>().HasKey(m => m.Id);
            modelBuilder.Entity<Episode>().HasKey(m => m.Id);
            modelBuilder.Entity<Genre>().HasKey(m => m.Id);
            modelBuilder.Entity<Image>().HasKey(m => m.Id);
            modelBuilder.Entity<Studio>().HasKey(m => m.Id);
            modelBuilder.Entity<MovieGenre>().HasKey(m => m.Id);
            modelBuilder.Entity<MovieStudio>().HasKey(m => m.Id);
        }
    }
}
