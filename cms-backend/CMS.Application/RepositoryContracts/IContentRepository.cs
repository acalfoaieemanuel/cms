using CMS.Shared.Models;

namespace CMS.Application.RepositoryContracts;

public interface IContentRepository
{
    Task<List<Content>> GetAllAsync();
    Task<Content?> GetByIdAsync(Guid id);
    Task CreateAsync(Content content);
    Task UpdateAsync(Guid id, Content content);
    Task DeleteAsync(Guid id);
}
