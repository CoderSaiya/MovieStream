namespace MovieService.DTOs
{
    public class ImageFileData
    {
        public IFormFile File { get; set; }
        public Stream Stream { get; set; }

        public ImageFileData(IFormFile file, Stream stream)
        {
            File = file;
            Stream = stream;
        }
    }
}
