using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests.Order;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController(IDunderMifflinService service) : ControllerBase
{
    [HttpPost]
    [Route("")]
    public ActionResult<Order> CreateOrder(CreateOrderDto createOrderDto)
    {
        var order = service.CreateOrder(createOrderDto);
        return Ok(order);
    }
}