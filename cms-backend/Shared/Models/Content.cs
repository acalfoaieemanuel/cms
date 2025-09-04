namespace CMS.Shared.Models;

public class Content
{
    public Guid Id { get; set; } = Guid.Empty;

    public string Image { get; init; } = string.Empty;
    public string Text { get; init; } = string.Empty;

    public Language Language { get; init; } = Language.En;

    public TextAlignment TextAlignment { get; init; } = TextAlignment.Left;
}