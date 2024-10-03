using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Service.TransferModels.Requests.Customer;
using Service.TransferModels.Requests.Order;
using Service.TransferModels.Requests.OrderEntry;
using Service.TransferModels.Requests.Paper;
using Service.TransferModels.Requests.Property;
using Service.TransferModels.Responses;

namespace Service;

public interface IDunderMifflinService
{
    //Order
    public OrderDto CreateOrder(CreateOrderDto createOrderDto);
    public OrderDto UpdateOrder(UpdateOrderDto updateOrderDto);
    public void DeleteOrder(int id);
    public OrderDto GetAllOrders();

    //OrderEntry
    public OrderEntryDto CreateOrderEntry(CreateOrderEntryDto createOrderEntryDto);
    public void DeleteOrderEntry(int id);
    public OrderEntryDto GetAllOrderEntries();


    //Customer
    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto);
    public CustomerDto UpdateCustomer(UpdateCustomerDto updateCustomerDto);
    public void DeleteCustomer(int id);
    public List<Customer> GetAllCustomers();

    //Paper
    public PaperDto CreatePaper(CreatePaperDto createPaperDto);
    public PaperDto UpdatePaper(UpdatePaperDto updatePaperDto);
    public void DeletePaper(int id);
    public List<PaperDto> GetAllPapers();
    public PaperDto GetPaperById(int id);

    //Property
    public PropertyDto CreateProperty(CreatePropertyDto createPropertyDto);
    public PropertyDto UpdateProperty(UpdatePropertyDto updatePropertyDto);
    public void DeleteProperty(int id);
    public List<Property> GetAllProperties();
    public PropertyDto GetPropertyById(int id);
    
    //PaperToProperty
    public void AddPropertyToPaper(int paperId, int propertyId);
}

public class DunderMifflinService(
    IValidator<CreateCustomerDto> createCustomerValidator,
    IValidator<UpdateCustomerDto> updateCustomerValidator,
    IValidator<CreatePaperDto> createPaperValidator,
    IValidator<UpdatePaperDto> updatePaperValidator,
    IValidator<CreatePropertyDto> createPropertyValidator,
    IValidator<UpdatePropertyDto> updatePropertyValidator,
    IValidator<CreateOrderEntryDto> createOrderEntryValidator,
    IValidator<UpdateOrderDto> updateOrderValidator,
  //  IValidator<CreateOrderDto> createOrderValidator,
    DunderMifflinContext context) : IDunderMifflinService
{
    public OrderDto CreateOrder(CreateOrderDto createOrderDto)
    {
        //createOrderValidator.ValidateAndThrow(createOrderDto);

        var orderEntries = createOrderDto.OrderEntries.Select(dto => new OrderEntry()
        {
            Quantity = dto.Quantity,
            ProductId = dto.ProductId
        }).ToList();

        var totalAmount = 0.0;

        foreach (OrderEntry oe in orderEntries)
        {
            var price = context.Papers.Where(paper => oe.ProductId == paper.Id).Select(paper => paper.Price).ToList().First();
            price = price * oe.Quantity;
            totalAmount += price;
        }
        
        var order = createOrderDto.ToOrder(totalAmount, orderEntries);
        context.Orders.Add(order);
        context.SaveChanges();
        return new OrderDto().FromEntity(order);
    }


    public OrderDto UpdateOrder(UpdateOrderDto updateOrderDto)
    {
        throw new NotImplementedException();
    }

    public void DeleteOrder(int id)
    {
        throw new NotImplementedException();
    }

    public OrderDto GetAllOrders()
    {
        throw new NotImplementedException();
    }

    public OrderEntryDto CreateOrderEntry(CreateOrderEntryDto createOrderEntryDto)
    {
        createOrderEntryValidator.ValidateAndThrow(createOrderEntryDto);
        var orderEntry = createOrderEntryDto.ToOrderEntry();
        context.OrderEntries.Add(orderEntry);
        context.SaveChanges();
        return new OrderEntryDto().FromEntity(orderEntry);
    }

    public void DeleteOrderEntry(int id)
    {
        throw new NotImplementedException();
    }

    public OrderEntryDto GetAllOrderEntries()
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
        context.SaveChanges();
        return new CustomerDto().FromEntity(customer);
    }

    public void DeleteCustomer(int id)
    {
        throw new NotImplementedException();
    }

    public List<Customer> GetAllCustomers()
    {
        return context.Customers.OrderBy(c => c.Id).ToList();
    }

    public PaperDto CreatePaper(CreatePaperDto createPaperDto)
    {
        createPaperValidator.ValidateAndThrow(createPaperDto);
        var paper = createPaperDto.ToPaper();
        context.Papers.Add(paper);
        context.SaveChanges();
        return new PaperDto().FromEntity(paper);
    }

    public PaperDto UpdatePaper(UpdatePaperDto updatePaperDto)
    {
        updatePaperValidator.ValidateAndThrow(updatePaperDto);
        var paper = updatePaperDto.ToPaper();
        context.Papers.Update(paper);
        context.SaveChanges();
        return new PaperDto().FromEntity(paper);
    }

    public void DeletePaper(int id)
    {
        context.Papers.Where(p => p.Id == id).ExecuteDelete();
    }

    public List<PaperDto> GetAllPapers()
    {
        var paper = context.Papers
            .Include(p => p.Properties).Select(p => new PaperDto().FromEntity(p))
            .ToList();
        return paper;
    }


   
        public PaperDto GetPaperById(int id)
        {
            var paper = context.Papers.Where(p => p.Id == id).Include(p => p.Properties).ToList().First();
            return new PaperDto().FromEntity(paper);
        }
    
    public PropertyDto CreateProperty(CreatePropertyDto createPropertyDto)
    {
        createPropertyValidator.ValidateAndThrow(createPropertyDto);
        var property = createPropertyDto.ToProperty();
        context.Properties.Add(property);
        context.SaveChanges();
        return new PropertyDto().FromEntity(property);
    }

    public PropertyDto UpdateProperty(UpdatePropertyDto updatePropertyDto)
    {
        updatePropertyValidator.ValidateAndThrow(updatePropertyDto);
        var property = updatePropertyDto.ToProperty();
        context.Properties.Update(property);
        context.SaveChanges();
        return new PropertyDto().FromEntity(property);
    }

    public void DeleteProperty(int id)
    {
        context.Properties.Where(p => p.Id == id).ExecuteDelete();
    }

    public List<Property> GetAllProperties()
    {
        return context.Properties.OrderBy(p => p.Id).ToList();
    }

    public PropertyDto GetPropertyById(int id)
    {
        var property = context.Properties.Find(id);
        return new PropertyDto().FromEntity(property);
    }

    public void AddPropertyToPaper(int paperId, int propertyId)
    {
        var paper = context.Papers.Find(paperId);
        var property = context.Properties.Find(propertyId);
        paper.Properties.Add(property);
        context.SaveChanges();

    }
}