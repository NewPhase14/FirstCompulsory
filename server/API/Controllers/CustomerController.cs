using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests.Customer;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerController(IDunderMifflinService service) : ControllerBase
{
    [HttpPost]
    [Route("")]
    public ActionResult<Customer> CreateCustomer(CreateCustomerDto createCustomerDto)
    {
        var customer = service.CreateCustomer(createCustomerDto);
        return Ok(customer);
    }

    [HttpPut]
    [Route("")]
    public ActionResult<Customer> UpdateCustomer(UpdateCustomerDto updateCustomerDto)
    {
        var customer = service.UpdateCustomer(updateCustomerDto);
        return Ok(customer);
    }

    [HttpGet]
    [Route("")]
    public ActionResult<List<Customer>> GetAllCustomers()
    {
        var customers = service.GetAllCustomers();
        return Ok(customers);
    }
}