namespace MovieService.DTOs
{
    public class PagingReq
    {
        public int PageNumber { get; } = 1;
        public int PageSize { get; } = 10;
        public string? SortBy { get; } = "Id";
        public string SortOrder { get; } = "acs";
    }
}
