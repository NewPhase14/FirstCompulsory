using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests.OrderEntry;
using Service.TransferModels.Responses;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderEntryController(IDunderMifflinService service) : ControllerBase
    {
        [HttpPost]
        public ActionResult<OrderEntryDto> CreateOrderEntry(CreateOrderEntryDto createOrderEntryDto)
        {
            var orderEntry = service.CreateOrderEntry(createOrderEntryDto);
            return Ok(orderEntry);
        }
        
    }
}