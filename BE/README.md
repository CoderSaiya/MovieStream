# 🎯 MovieStream Backend

Backend microservices implementation for the MovieStream platform.

## 🏗 Architecture Overview

![Microservice-Artchitecture](../images/movieflix.png)

## 🔧 Prerequisites

- .NET 8.0 SDK
- Docker Desktop
- SQL Server 2019+
- Redis
- RabbitMQ

## 🚀 Getting Started

### 1. Environment Setup

```bash
# Clone repository if you haven't already
git clone https://github.com/codersaiya/moviestream.git
cd moviestream/BE

# Copy environment files
cp .env.example .env
```

### 2. Database Setup

```bash
# Using Docker
docker-compose up sql-server redis rabbitmq elasticsearch kibana -d

# Or configure your own instances in appsettings.json
```

### 3. Service Configuration

Update `appsettings.json` in each service:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=YourNameDatabase;User=YourUsername;Password=YourPassword;",
    "Redis": "localhost:6379",
    "RabbitMQ": "amqp://guest:guest@localhost:5672"
  }
}
```

### 4. Running Services

#### Using Docker (Recommended)
```bash
docker-compose up --build
```

#### Manual Setup
```bash
# Start each service individually
cd Services/UserService
dotnet run

cd ../MovieService
dotnet run

# Repeat for other services
```

### 5. Verify Setup

Services will be available at:
- API Gateway: `http://localhost:5000`
- Movie Service: `http://localhost:7225`
- Auth (Token) Service: `http://localhost:7226`
- Search Service: `http://localhost:7227`
- User Service: `http://localhost:7228`
- Payment Service: `http://localhost:7230`
- Gmail Service: `http://localhost:7231`
- Analytics Service: `http://localhost:7232`
- Notification Service: `http://localhost:7233`
- Recommendation Service: `http://localhost:7234`

## 📋 API Documentation

Swagger documentation available at:
- `http://localhost:5000/swagger` (Gateway)
- `http://localhost:72xx/swagger` (Individual Services)

## 🔍 Service Details

### User Service
- Authentication
- User Management
- VIP Subscriptions

### Movie Service
- Movie Catalog
- Metadata Management
- Genre Classification

### Auth (Token) Service
- Generate Acess Token or Refresh Token
- Valid Token
- Sign up/ Sign in

### Playback Service
- Video Streaming
- Quality Control
- Playback Analytics

### Recommendation Service
- Personalized Recommendations
- Viewing History Analysis
- Trending Movies

### Search Service
- Full-text Search
- Advanced Filtering
- Search Analytics

### Payment Service
- Manage Transactions
- Stripe
- Sandbox

### Analytics Service
- Metrics Management

### Notifications Service
- Send Notification each event
- Log cache by Redis
- Send by Email, Telegram,...

## 🔧 Maintenance

### Database Migrations
```bash
cd Services/UserService
dotnet ef database update

# Repeat for other services with databases
```

### Logging
- Logs are stored in `/logs` directory
- Using Serilog for structured logging
- Elasticsearch integration available

## 🔒 Security

- JWT Authentication
- API Key validation
- Rate limiting
- CORS configuration
- Data encryption

## 🔍 Monitoring

- Health checks: `http://localhost:5000/health`
- Metrics: Prometheus endpoints
- Tracing: OpenTelemetry integration

## 🐞 Troubleshooting

Common issues and solutions:
1. Connection refused
   - Check if Docker containers are running
   - Verify port availability

2. Database connection failed
   - Verify connection strings
   - Check SQL Server status

3. RabbitMQ issues
   - Verify credentials
   - Check queue status

## 📚 Additional Resources

- [Microservices Documentation](../docs/microservices.md)
- [API Documentation](../docs/api.md)
- [Deployment Guide](../docs/deployment.md)
