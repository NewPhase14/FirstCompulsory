using DataAccess.Models;

namespace Service.TransferModels.Requests;

public class UpdatePaperDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public bool Discontinued { get; set; }

    public int Stock { get; set; }

    public double Price { get; set; }
    
    public string Picture { get; set; }

    public Paper ToPaper()
    {
        return new Paper()
        {
            Id = Id,
            Name = Name,
            Discontinued = Discontinued,
            Stock = Stock,
            Price = Price,
            Picture = Picture
        };
    }
}