using CMS.Application.LogicContracts;
using CMS.Application.RepositoryContracts;
using CMS.Shared.Models;

namespace CMS.Application.Logic;

public class ContentLogic(IContentRepository repo) : IContentLogic
{
    public async Task<List<Content>> GetAllAsync() =>
        await repo.GetAllAsync();

    public async Task<Content?> GetByIdAsync(Guid id) =>
        await repo.GetByIdAsync(id);

    public async Task<Content> CreateAsync(Content content)
    {
        if (string.IsNullOrWhiteSpace(content.Text))
            throw new ArgumentException("Text cannot be empty");

        content.Id = Guid.NewGuid(); // generate new GUID
        await repo.CreateAsync(content);
        return content;
    }

    public async Task<bool> UpdateAsync(Guid id, Content content)
    {
        var existing = await repo.GetByIdAsync(id);
        if (existing is null) return false;

        content.Id = id;
        await repo.UpdateAsync(id, content);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var existing = await repo.GetByIdAsync(id);
        if (existing is null) return false;

        await repo.DeleteAsync(id);
        return true;
    }
}