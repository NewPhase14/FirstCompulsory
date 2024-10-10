using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests.Order;
using Service.TransferModels.Responses;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController(IDunderMifflinService service) : ControllerBase
{
    [HttpPost]
    [Route("")]
    public ActionResult<OrderDto> CreateOrder(CreateOrderDto createOrderDto)
    {
        var order = service.CreateOrder(createOrderDto);
        return Ok(order);
    }
    
    [HttpGet]
    [Route("")]
    public ActionResult<List<OrderDto>> GetAllOrders()
    {
        var orders = service.GetAllOrders();
        return Ok(orders);
    }
    
    [HttpGet]
    [Route("customer/{customerId}")]
    public ActionResult<List<OrderDto>> GetOrdersByCustomerId(int customerId)
    {
        var orders = service.GetOrderByCustomerId(customerId);
        return Ok(orders);
    }
}