namespace Service.TransferModels.Requests.Paper;

public class CreatePaperDto
{
    public string Name { get; set; } = null!;

    public bool Discontinued { get; set; }

    public int Stock { get; set; }

    public double Price { get; set; }

    public string Picture { get; set; }
    

    public DataAccess.Models.Paper ToPaper()
    {
        return new DataAccess.Models.Paper
        {
            Name = Name,
            Discontinued = Discontinued,
            Stock = Stock,
            Price = Price,
            Picture = Picture,
        };
    }
}