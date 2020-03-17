#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY LocPoc.Api/LocPoc.Api.csproj LocPoc.Api/
COPY LocPoc.Contracts/LocPoc.Contracts.csproj LocPoc.Contracts/
COPY LocPoc.Repository.Sqlite/LocPoc.Repository.Sqlite.csproj LocPoc.Repository.Sqlite/
RUN dotnet restore "LocPoc.Api/LocPoc.Api.csproj"
COPY . .
WORKDIR "/src/LocPoc.Api"
RUN dotnet build "LocPoc.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LocPoc.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LocPoc.Api.dll"]
