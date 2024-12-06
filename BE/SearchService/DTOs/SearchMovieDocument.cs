namespace SearchService.DTOs
{
    public class SearchMovieDocument
    {
        public int MovieId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string? Director { get; set; }
        public string? Genre { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
