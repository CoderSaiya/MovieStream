﻿namespace MovieService.Events
{
    public interface IEventBus
    {
        void Publish<TEvent>(TEvent @event) where TEvent : IntegrationEvent;
        void Subscribe<TEvent, THandler>() 
            where TEvent : IntegrationEvent 
            where THandler : IIntegrationEventHandler<TEvent>;
    }
}
