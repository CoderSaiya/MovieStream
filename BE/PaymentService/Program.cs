using Microsoft.EntityFrameworkCore;
using PaymentService.Data;
using PaymentService.Repository;
using SharedLibrary.EventBus;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PaymentDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});

builder.Services.AddScoped<IPayment, PaymentRepo>();

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

app.Run();
