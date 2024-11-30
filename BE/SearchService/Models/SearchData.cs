namespace SearchService.Models
{
    public class SearchData
    {
        public string? Query { get; set; }
        public string? Title { get; set; }
        public string? Genre { get; set; }
        public float RelevanceScore { get; set; }
    }
}
