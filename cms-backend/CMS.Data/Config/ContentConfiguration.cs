using CMS.Shared.Models;

namespace CMS.Data.Config;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ContentConfiguration : IEntityTypeConfiguration<Content>
{
    public void Configure(EntityTypeBuilder<Content> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Image)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(c => c.Text)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(c => c.Language)
            .HasConversion<string>()  
            .HasMaxLength(10)
            .IsRequired();

        builder.Property(c => c.TextAlignment)
            .HasConversion<string>()  
            .HasMaxLength(10)
            .IsRequired();
    }
}
