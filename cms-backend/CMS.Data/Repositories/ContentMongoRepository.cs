using CMS.Application.RepositoryContracts;
using CMS.Shared.Models;
using MongoDB.Driver;

namespace CMS.Data.Repositories;

public class ContentMongoRepository(IMongoDatabase database) : IContentRepository
{
    private readonly IMongoCollection<Content> _collection = database.GetCollection<Content>("Contents");

    public async Task<List<Content>> GetAllAsync() =>
        await _collection.Find(_ => true).ToListAsync();

    public async Task<Content?> GetByIdAsync(Guid id) =>
        await _collection.Find(c => c.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Content content) =>
        await _collection.InsertOneAsync(content);

    public async Task UpdateAsync(Guid id, Content content) =>
        await _collection.ReplaceOneAsync(c => c.Id == id, content);

    public async Task DeleteAsync(Guid id) =>
        await _collection.DeleteOneAsync(c => c.Id == id);
}