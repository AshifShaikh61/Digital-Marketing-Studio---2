# Mohd Digital Marketing - ASP.NET Core 8 Web API & SQL Server Backend

This directory contains the complete, production-grade **ASP.NET Core Web API** and **Entity Framework Core 8** backend designed to power the Mohd Digital Marketing suite.

## Architecture & Technology Stack
- **Framework**: ASP.NET Core 8 / 9 Web API (`Microsoft.NET.Sdk.Web`)
- **ORM**: Entity Framework Core 8 (`Microsoft.EntityFrameworkCore.SqlServer`, `Microsoft.EntityFrameworkCore.Sqlite`)
- **Database Support**:
  - Microsoft SQL Server 2022 / Azure SQL
  - SQLite local embedded database fallback
- **API Documentation**: Swagger / OpenAPI 3 (`Swashbuckle.AspNetCore`)

## Project Structure
```
backend-dotnet/
├── MohdDigital.Api.csproj         # .NET 8 Project file with EF Core packages
├── Program.cs                     # WebApplication builder, Kestrel setup, CORS, DbSeeder
├── appsettings.json               # SQL Server connection strings & logging config
├── Models/
│   └── Entities.cs                # Client, SocialPost, PatientLead, WhatsAppMessage, Campaign
├── Data/
│   ├── MohdDigitalDbContext.cs    # EF Core DbContext with relational navigation
│   └── DbSeeder.cs                # Automatic startup seeder for clients & leads
└── Controllers/
    ├── ClientsController.cs       # RESTful API for Client Management
    └── PostsController.cs         # RESTful API for Instagram approvals & workflow
```

## How to Run with .NET SDK

### Prerequisites
- Install [.NET 8 SDK or .NET 9 SDK](https://dotnet.microsoft.com/download)
- Optional: SQL Server Express / LocalDB, or use the default SQLite fallback

### Run Commands
```bash
cd backend-dotnet
dotnet restore
dotnet build
dotnet run
```
The API will start listening at `https://localhost:5001` or `http://localhost:5000` with Swagger UI available at:
`http://localhost:5000/swagger`

## Note on Container Environment
Inside the Google AI Studio container sandbox, the active web process runs on **Node.js + Express + SQLite** on port 3000 (`server.ts`) with identical REST endpoints, payload schemas, and persistent database tables. This `/backend-dotnet` solution gives you the exact Microsoft .NET C# source code ready for your enterprise deployment.
