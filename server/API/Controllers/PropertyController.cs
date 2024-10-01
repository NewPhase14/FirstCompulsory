using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests.Property;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropertyController(IDunderMifflinService service) : ControllerBase
{
    [HttpPost]
    [Route("")]
    public ActionResult<Property> CreateProperty(CreatePropertyDto createPropertyDto)
    {
        var property = service.CreateProperty(createPropertyDto);
        return Ok(property);
    }

    [HttpPut]
    [Route("")]
    public ActionResult<Property> UpdateProperty(UpdatePropertyDto updatePropertyDto)
    {
        var property = service.UpdateProperty(updatePropertyDto);
        return Ok(property);
    }

    [HttpDelete]
    [Route("/api/[controller]/{id}")]
    public ActionResult<Property> DeleteProperty(int id)
    {
        service.DeleteProperty(id);
        return NoContent();
    }

    [HttpGet]
    [Route("")]
    public ActionResult<List<Property>> GetAllProperties()
    {
        var properties = service.GetAllProperties();
        return Ok(properties);
    }

    [HttpGet]
    [Route("/api/[controller]/{id}")]
    public ActionResult<Property> GetPropertyById(int id)
    {
        var property = service.GetPropertyById(id);
        return Ok(property);
    }
}