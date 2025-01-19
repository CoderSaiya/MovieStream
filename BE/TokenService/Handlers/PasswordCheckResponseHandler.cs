using SharedLibrary.Events;
using SharedLibrary.Handler;
using SharedLibrary.Integration;

namespace TokenService.Events
{
    public class PasswordCheckResponseHandler : IIntegrationEventHandler<PasswordCheckResponseEvent>
    {
        private readonly ResponseHandler _responseHandler;

        public PasswordCheckResponseHandler(ResponseHandler responseHandler)
        {
            _responseHandler = responseHandler;
        }
        public Task Handle(PasswordCheckResponseEvent @event)
        {
            var response = new
            {
                Role = @event.Role,
                UserId = @event.UserId,
            };
            _responseHandler.SetResponse(@event.CorrelationId, response);
            return Task.CompletedTask;
        }
    }
}
