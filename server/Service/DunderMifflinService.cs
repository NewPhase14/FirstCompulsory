using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Service.TransferModels.Requests;
using Service.TransferModels.Responses;
using Service.Validators;

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
    public List<Customer> GetAllCustomers();
    
    //Paper
    public PaperDto CreatePaper(CreatePaperDto createPaperDto);
    public PaperDto UpdatePaper(UpdatePaperDto updatePaperDto);
    public PaperDto DeletePaper(DeletePaperDto deletePaperDto);
    public PaperDto GetAllPapers();
}


public class DunderMifflinService(IValidator<CreateCustomerDto> createCustomerValidator, IValidator<UpdateCustomerDto> updateCustomerValidator, DunderMifflinContext context) : IDunderMifflinService 
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
        createCustomerValidator.ValidateAndThrow(createCustomerDto);
        var customer = createCustomerDto.ToCustomer();
        context.Customers.Add(customer);
        context.SaveChanges();
        return new CustomerDto().FromEntity(customer);
    }

    public CustomerDto UpdateCustomer(UpdateCustomerDto updateCustomerDto)
    {
        updateCustomerValidator.ValidateAndThrow(updateCustomerDto);
        var customer = updateCustomerDto.ToCustomer();
        context.Customers.Update(customer);
        return new CustomerDto().FromEntity(customer);
        
    }

    public CustomerDto DeleteCustomer(DeleteCustomerDto deleteCustomerDto)
    {
        throw new NotImplementedException();
    }

    public List<Customer> GetAllCustomers()
    {
        return context.Customers.ToList();
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