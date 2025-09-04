using CMS.Application.RepositoryContracts;
using CMS.Data.Context;
using CMS.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace CMS.Data.Repositories;

public class ContentEfRepository(SqliteContext context) : IContentRepository
{
    public async Task<List<Content>> GetAllAsync() =>
        await context.Contents.ToListAsync();

    public async Task<Content?> GetByIdAsync(Guid id) =>
        await context.Contents.FirstOrDefaultAsync(c => c.Id == id);

    public async Task CreateAsync(Content content)
    {
        context.Contents.Add(content);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Guid id, Content content)
    {
        var existing = await context.Contents.FirstOrDefaultAsync(c => c.Id == id);
        if (existing is null) return;

        context.Contents.Update(content);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var existing = await context.Contents.FirstOrDefaultAsync(c => c.Id == id);
        if (existing is null) return;

        context.Contents.Remove(existing);
        await context.SaveChangesAsync();
    }
}