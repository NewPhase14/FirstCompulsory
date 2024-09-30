using DataAccess.Models;

namespace Service.TransferModels.Requests;

public class CreateOrderEntryDto
{
    public int Id { get; set; }

    public int Quantity { get; set; }

    public int? ProductId { get; set; }

    public int? OrderId { get; set; }

    public DataAccess.Models.OrderEntry ToOrderEntry()
    {
        return new DataAccess.Models.OrderEntry()
        {
            Id = Id,
            Quantity = Quantity,
            ProductId = ProductId,
            OrderId = OrderId
        };
    }
}