using Service.TransferModels.Requests;
using Service.TransferModels.Responses;

namespace Service;


public interface IDunderMifflinService
{
    //Order
    public OrderDto CreateOrder(CreateOrderDto createOrderDto);
    public OrderDto UpdateOrder(UpdateOrderDto updateOrderDto);
    public OrderDto DeleteOrder(DeleteOrderDto deleteOrderDto);
    public OrderDto GetAllOrders();
    
    //Customer
    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto);
    public CustomerDto UpdateCustomer(UpdateCustomerDto updateCustomerDto);
    public CustomerDto DeleteCustomer(DeleteCustomerDto deleteCustomerDto);
    public CustomerDto GetAllCustomers();
    
    //Paper
    public PaperDto CreatePaper(CreatePaperDto createPaperDto);
    public PaperDto UpdatePaper(UpdatePaperDto updatePaperDto);
    public PaperDto DeletePaper(DeletePaperDto deletePaperDto);
    public PaperDto GetAllPapers();
}


public class DunderMifflinService
{
    
    
}