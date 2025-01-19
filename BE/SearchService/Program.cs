using SearchService.Repositories;
using SharedLibrary.EventBus;
using SharedLibrary.Events;
using SearchService.Handler;
using SearchService.RabbitMQ;

var handler = new HttpClientHandler
{
    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
};

var httpClient = new HttpClient(handler);

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddSingleton(provider =>
//{
//    var settings = new ElasticsearchClientSettings(new Uri("https://localhost:9200"))
//        .CertificateFingerprint("MovieFlix2025")
//        .DefaultIndex("movies");

//    return new Elastic.Clients.Elasticsearch.ElasticsearchClient(settings);
//});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<SearchService.ElasticsearchClient>();
builder.Services.AddScoped<ISearch, SearchRepo>();

// Add RabbitMQ Event Bus
builder.Services.AddSingleton<IEventBus, EventBus>(sp =>
{
    var serviceProvider = sp.GetRequiredService<IServiceProvider>();
    return new EventBus(serviceProvider);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Lifetime.ApplicationStarted.Register(() =>
{
    var eventBus = app.Services.GetRequiredService<IEventBus>();
    eventBus.Subscribe<MovieCreatedEvent, MovieCreatedEventHandler>();
    eventBus.Subscribe<SyncElasticEvent, SyncMovieHandler>();
});

app.Run();
