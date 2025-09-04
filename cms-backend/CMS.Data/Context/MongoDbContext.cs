using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace CMS.Data.Context;

public class MongoDbContext
{
    public IMongoDatabase? Database { get; }
    private readonly IConfiguration _configuration;

    public MongoDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
        var connectionString = configuration.GetConnectionString("DbConnection");
        var mongoUrl = new MongoUrl(connectionString);
        var mongoClient = new MongoClient(mongoUrl);    
        Database = mongoClient.GetDatabase(mongoUrl.DatabaseName);
    }
}