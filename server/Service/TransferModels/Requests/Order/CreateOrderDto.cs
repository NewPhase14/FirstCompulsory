using Service.TransferModels.Requests.OrderEntry;


namespace Service.TransferModels.Requests.Order;

public class CreateOrderDto
{
    public int? CustomerId { get; set; }

    public ICollection<CreateOrderEntryDto> OrderEntries { get; set; } = new List<CreateOrderEntryDto>();
    
    public DataAccess.Models.Order ToOrder(double totalAmount, List<DataAccess.Models.OrderEntry> orderEntries)
    {
        var order = new DataAccess.Models.Order
        {
            OrderDate = DateTime.UtcNow,
            DeliveryDate = DateOnly.FromDateTime(DateTime.Today.AddDays(3)),
            TotalAmount = totalAmount,
            CustomerId = this.CustomerId,
            OrderEntries = orderEntries
        };
        return order;
    }
}