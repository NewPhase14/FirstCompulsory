namespace Service.TransferModels.Requests.Order;

public class UpdateOrderDto
{
    public int Id { get; set; }

    public DateTime OrderDate { get; set; }

    public DateOnly? DeliveryDate { get; set; }

    public string Status { get; set; } = null!;

    public double TotalAmount { get; set; }

    public int? CustomerId { get; set; }

    public DataAccess.Models.Order ToOrder()
    {
        return new DataAccess.Models.Order
        {
            Id = Id,
            OrderDate = OrderDate,
            DeliveryDate = DeliveryDate,
            Status = Status,
            TotalAmount = TotalAmount,
            CustomerId = CustomerId,
        };
    }
}