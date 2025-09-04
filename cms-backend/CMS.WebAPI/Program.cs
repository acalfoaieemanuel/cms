using CMS.Application.Logic;
using CMS.Application.LogicContracts;
using CMS.Application.RepositoryContracts;
using CMS.Data.Context;
using CMS.Data.Repositories;
using CMS.WebAPI.Endpoints;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Mongo setup
var connectionString = builder.Configuration.GetConnectionString("DbConnection");
var mongoUrl = new MongoUrl(connectionString);
var mongoClient = new MongoClient(mongoUrl);
var database = mongoClient.GetDatabase("Database");

// Register DI
builder.Services.AddSingleton(database);
builder.Services.AddDbContext<SqliteContext>();
builder.Services.AddScoped<IContentRepository, ContentEfRepository>();
builder.Services.AddScoped<IContentLogic, ContentLogic>();

// ✅ Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(x => x
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed(origin => true)
        .AllowCredentials());
}

// Map endpoints
app.MapContentEndpoints();

app.Run();