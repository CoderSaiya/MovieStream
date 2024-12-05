FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["TokenService/TokenService.csproj", "TokenService/"]
RUN dotnet restore "TokenService/TokenService.csproj"
COPY . .
WORKDIR "/src/TokenService"
RUN dotnet build "TokenService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TokenService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TokenService.dll"]