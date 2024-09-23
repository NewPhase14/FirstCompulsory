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


public class DunderMifflinService() : IDunderMifflinService 
{
    public OrderDto CreateOrder(CreateOrderDto createOrderDto)
    {
        throw new NotImplementedException();
    }

    public OrderDto UpdateOrder(UpdateOrderDto updateOrderDto)
    {
        throw new NotImplementedException();
    }

    public OrderDto DeleteOrder(DeleteOrderDto deleteOrderDto)
    {
        throw new NotImplementedException();
    }

    public OrderDto GetAllOrders()
    {
        throw new NotImplementedException();
    }

    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto)
    {
        throw new NotImplementedException();
    }

    public CustomerDto UpdateCustomer(UpdateCustomerDto updateCustomerDto)
    {
        throw new NotImplementedException();
    }

    public CustomerDto DeleteCustomer(DeleteCustomerDto deleteCustomerDto)
    {
        throw new NotImplementedException();
    }

    public CustomerDto GetAllCustomers()
    {
        throw new NotImplementedException();
    }

    public PaperDto CreatePaper(CreatePaperDto createPaperDto)
    {
        throw new NotImplementedException();
    }

    public PaperDto UpdatePaper(UpdatePaperDto updatePaperDto)
    {
        throw new NotImplementedException();
    }

    public PaperDto DeletePaper(DeletePaperDto deletePaperDto)
    {
        throw new NotImplementedException();
    }

    public PaperDto GetAllPapers()
    {
        throw new NotImplementedException();
    }
}