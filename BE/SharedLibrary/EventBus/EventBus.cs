using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System.Text;
using SharedLibrary.Integration;

namespace SharedLibrary.EventBus
{
    public class EventBus : IEventBus, IDisposable
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IModel _channel;
        private readonly IConnection _connection;

        public EventBus(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            var factory = new ConnectionFactory { HostName = "host.docker.internal", Port = AmqpTcpEndpoint.UseDefaultPort };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
        }

        public void Publish<TEvent>(TEvent @event) where TEvent : IntegrationEvent
        {
            var eventName = @event.GetType().Name;
            _channel.QueueDeclare(eventName, durable: true, exclusive: false, autoDelete: false);
            var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(@event));
            _channel.BasicPublish(exchange: "", routingKey: eventName, basicProperties: null, body: body);
        }

        public void Subscribe<TEvent, THandler>()
            where TEvent : IntegrationEvent
            where THandler : IIntegrationEventHandler<TEvent>
        {
            var eventName = typeof(TEvent).Name;
            _channel.QueueDeclare(eventName, durable: true, exclusive: false, autoDelete: false);

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (_, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                var @event = JsonConvert.DeserializeObject<TEvent>(message);

                using var scope = _serviceProvider.CreateScope();
                var handler = scope.ServiceProvider.GetRequiredService<THandler>();
                await handler.Handle(@event);
            };

            _channel.BasicConsume(queue: eventName, autoAck: true, consumer: consumer);
        }

        public void Dispose()
        {
            _channel?.Dispose();
            _connection?.Dispose();
        }
    }
}
