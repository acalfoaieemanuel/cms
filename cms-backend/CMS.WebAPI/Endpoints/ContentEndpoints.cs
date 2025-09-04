using CMS.Application.LogicContracts;
using CMS.Shared.Models;
using CMS.WebAPI.Dto;
using Mapster;

namespace CMS.WebAPI.Endpoints;

public static class ContentEndpoints
{
    public static IEndpointRouteBuilder MapContentEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/content");

        // GET all
        group.MapGet("/", async (IContentLogic logic) =>
        {
            var contents = await logic.GetAllAsync();
            var dtoList = contents.Adapt<List<ReadContentDto>>(); 
            return Results.Ok(dtoList);
        });

        // GET by Id
        group.MapGet("/{id:guid}", async (Guid id, IContentLogic logic) =>
        {
            var content = await logic.GetByIdAsync(id);
            return content is not null ? Results.Ok(content.Adapt<ReadContentDto>()) : Results.NotFound();
        });

        // POST
        group.MapPost("/", async (CreateContentDto dto, IContentLogic logic) =>
        {
            var content = dto.Adapt<Content>(); 
            var created = await logic.CreateAsync(content);
            return Results.Created($"/api/content/{created.Id}", created.Adapt<ReadContentDto>());
        });

        // PUT
        group.MapPut("/{id:guid}", async (Guid id, UpdateContentDto dto, IContentLogic logic) =>
        {
            var content = dto.Adapt<Content>();
            var updated = await logic.UpdateAsync(id, content);
            return updated ? Results.NoContent() : Results.NotFound();
        });

        // DELETE
        group.MapDelete("/{id:guid}", async (Guid id, IContentLogic logic) =>
        {
            var deleted = await logic.DeleteAsync(id);
            return deleted ? Results.NoContent() : Results.NotFound();
        });

        return app;
    }
}