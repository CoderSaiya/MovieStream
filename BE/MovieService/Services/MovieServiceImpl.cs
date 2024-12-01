//using Grpc.Core;
//using MovieService.Grpc;
//using MovieService.Models;
//using MovieService.Data;
//using MovieService.Events;
//using AWSSDK;

//namespace MovieService.Services
//{
//    public class MovieServiceImpl : MovieService.Grpc.MovieService.MovieServiceBase
//    {
//        private readonly MovieDbContext _context;
//        private readonly IEventBus _eventBus;

//        public MovieServiceImpl(MovieDbContext context, IEventBus eventBus)
//        {
//            _context = context;
//            _eventBus = eventBus;
//        }

//        public override async Task<MovieResponse> GetMovieDetails(MovieRequest request, ServerCallContext context)
//        {
//            var movie = await _context.Movies.FindAsync(request.MovieId);
//            if (movie == null)
//            {
//                throw new RpcException(new Status(StatusCode.NotFound, "Movie not found"));
//            }

//            return new MovieResponse
//            {
//                Title = movie.Title,
//                Description = movie.Description,
//                Quality = movie.Quality,
//                IsVipOnly = movie.IsVipOnly
//            };
//        }

//        public override async Task<AddMovieResponse> AddMovie(AddMovieRequest request, ServerCallContext context)
//        {
//            var movie = new Movie
//            {
//                Title = request.Title,
//                Description = request.Description,
//                Quality = request.Quality,
//                IsVipOnly = request.IsVipOnly,
//                FileUrl = request.FileUrl,
//                ReleaseDate = request.ReleaseDate.ToDateTime()
//            };

//            _context.Movies.Add(movie);
//            await _context.SaveChangesAsync();

//            // Publish event
//            var movieAddedEvent = new MovieAddedEvent
//            {
//                MovieId = movie.MovieId,
//                Title = movie.Title,
//                Quality = movie.Quality,
//                IsVipOnly = movie.IsVipOnly
//            };
//            _eventBus.Publish(movieAddedEvent);

//            return new AddMovieResponse { MovieId = movie.MovieId };
//        }
//    }
//}
