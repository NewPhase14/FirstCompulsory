namespace Service.TransferModels.Requests.Customer;

public class UpdateCustomerDto
{
    public int Id { get; set; }
    public string Name { get; set; }

    public string? Address { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public DataAccess.Models.Customer ToCustomer()
    {
        return new DataAccess.Models.Customer
        {
            Id = Id,
            Name = Name,
            Address = Address,
            Phone = Phone,
            Email = Email
        };
    }
}