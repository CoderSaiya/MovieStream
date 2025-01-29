using SharedLibrary.RabbitMQ.Events;
using SharedLibrary.RabbitMQ.Handler;
using SharedLibrary.RabbitMQ.Integration;

namespace AuthService.Events
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
