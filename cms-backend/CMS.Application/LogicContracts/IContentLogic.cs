using CMS.Shared.Models;

namespace CMS.Application.LogicContracts;

public interface IContentLogic
{
    Task<List<Content>> GetAllAsync();
    Task<Content?> GetByIdAsync(Guid id);
    Task<Content> CreateAsync(Content content);
    Task<bool> UpdateAsync(Guid id, Content content);
    Task<bool> DeleteAsync(Guid id);
}
