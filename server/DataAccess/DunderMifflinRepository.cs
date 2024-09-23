using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccess;


public class DunderMifflinRepository(DunderMifflinContext context) : IDunderMifflinRepository
{
    
    public async Task<IEnumerable<Paper>> GetPapersAsync()
    {
        return await context.Papers.ToListAsync();
    }

    public async Task<Paper> GetPaperByIdAsync(int id)
    {
        return await context.Papers.FindAsync(id);
    }

    public async Task<Paper> CreatePaperAsync(Paper paper)
    {
        var result = await context.Papers.AddAsync(paper);
        await context.SaveChangesAsync();
        return result.Entity;
    }

    public async Task<Paper> UpdatePaperAsync(Paper paper)
    {
        var result = context.Papers.Update(paper);
        await context.SaveChangesAsync();
        return result.Entity;
    }

    public async Task DeletePaperAsync(int id)
    {
        var paper = await context.Papers.FindAsync(id);
        context.Papers.Remove(paper);
        await context.SaveChangesAsync();
    }
}