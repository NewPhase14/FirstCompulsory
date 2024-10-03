using DataAccess.Models;
using Service.TransferModels.Responses;
using System.Collections.Generic;

public class PaperDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    public string Picture { get; set; }

    public List<PropertyDto> Property { get; set; } = new List<PropertyDto>();

    public PaperDto FromEntity(Paper paper)
    {
        return new PaperDto
        {
            Id = paper.Id,
            Name = paper.Name,
            Discontinued = paper.Discontinued,
            Stock = paper.Stock,
            Price = paper.Price,
            Picture = paper.Picture,
            Property = paper.Properties.Select(p => new PropertyDto().FromEntity(p)).ToList()
        };
    }
}