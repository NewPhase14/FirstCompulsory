namespace Service.TransferModels.Requests.OrderEntry;

public class CreateOrderEntryDto
{
    public int Quantity { get; set; }

    public int? ProductId { get; set; }

    public int? OrderId { get; set; }

    public DataAccess.Models.OrderEntry ToOrderEntry()
    {
        return new DataAccess.Models.OrderEntry
        {
            Quantity = Quantity,
            ProductId = ProductId
        };
    }
}