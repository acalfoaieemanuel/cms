using CMS.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace CMS.Data.Context;

public class SqliteContext : DbContext
{
    public string Connection { get; } = "Data Source=..\\CMS.Data\\CSM.db";
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite(Connection);
    }
    public DbSet<Content> Contents { get; set; }
}