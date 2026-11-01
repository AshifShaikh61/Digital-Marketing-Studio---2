using Microsoft.EntityFrameworkCore;
using MohdDigital.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS for React frontend on port 3000
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://0.0.0.0:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configure SQL Database (SQL Server default or SQLite fallback)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (connectionString?.Contains(".db") == true)
{
    builder.Services.AddDbContext<MohdDigitalDbContext>(options =>
        options.UseSqlite(connectionString));
}
else
{
    builder.Services.AddDbContext<MohdDigitalDbContext>(options =>
        options.UseSqlServer(connectionString ?? "Server=(localdb)\\mssqllocaldb;Database=MohdDigitalDb;Trusted_Connection=True;MultipleActiveResultSets=true"));
}

var app = builder.Build();

// Seed Database automatically on startup
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MohdDigitalDbContext>();
    context.Database.EnsureCreated();
    DbSeeder.SeedData(context);
}

// Configure HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
