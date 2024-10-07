namespace Service.TransferModels.Requests.Paper;

public class UpdatePaperDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public bool Discontinued { get; set; }

    public int Stock { get; set; }

    public double Price { get; set; }

    public string Picture { get; set; }
    
    public string Description { get; set; }

    public ICollection<DataAccess.Models.Property> Properties { get; set; }

    public DataAccess.Models.Paper ToPaper()
    {
        return new DataAccess.Models.Paper
        {
            Id = Id,
            Name = Name,
            Discontinued = Discontinued,
            Stock = Stock,
            Price = Price,
            Picture = Picture,
            Description = Description,
            Properties = Properties
        };
    }
}