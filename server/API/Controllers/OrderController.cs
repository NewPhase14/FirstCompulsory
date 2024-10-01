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
}