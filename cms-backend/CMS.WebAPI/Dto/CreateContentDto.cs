namespace CMS.WebAPI.Dto;

public class CreateContentDto
{
    public string Image { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public string Language { get; set; } = string.Empty;
    public string TextAlignment { get; set; } = string.Empty;
}
