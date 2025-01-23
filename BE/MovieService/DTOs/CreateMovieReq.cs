namespace MovieService.DTOs
{
    public class CreateMovieReq
    {
        public MovieDTO MovieDto { get; set; }
        public List<int> GenreIds { get; set; }
        public List<int> StudioIds { get; set; }
    }
}
