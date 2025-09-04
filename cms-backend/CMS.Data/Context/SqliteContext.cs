using CMS.Shared.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CMS.Data.Context;

public class SqliteContext(DbContextOptions<SqliteContext> options, IConfiguration configuration) : DbContext(options)
{

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = configuration.GetConnectionString("MyDb");
        optionsBuilder.UseSqlite(connectionString);
    }
    public DbSet<Content> Contents { get; set; } 
}