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
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MovieGenre>()
             .HasKey(mg => new { mg.MovieId, mg.GenreId });

            modelBuilder.Entity<MovieGenre>()
                .HasOne(mg => mg.Movie)
                .WithMany(m => m.MovieGenres)
                .HasForeignKey(mg => mg.MovieId);

            modelBuilder.Entity<MovieGenre>()
                .HasOne(mg => mg.Genre)
                .WithMany(g => g.MovieGenres)
                .HasForeignKey(mg => mg.GenreId);

            modelBuilder.Entity<MovieStudio>()
            .HasKey(ms => new { ms.MovieId, ms.StudioId });

            modelBuilder.Entity<MovieStudio>()
                .HasOne(ms => ms.Movie)
                .WithMany(m => m.MovieStudios)
                .HasForeignKey(ms => ms.MovieId);

            modelBuilder.Entity<MovieStudio>()
                .HasOne(ms => ms.Studio)
                .WithMany(s => s.MovieStudios)
                .HasForeignKey(ms => ms.StudioId);
        }
    }
}
