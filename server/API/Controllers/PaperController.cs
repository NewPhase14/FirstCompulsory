using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests.Paper;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaperController(IDunderMifflinService service) : ControllerBase
{
    [HttpPost]
    [Route("")]
    public ActionResult<Paper> CreatePaper(CreatePaperDto createPaperDto)
    {
        var paper = service.CreatePaper(createPaperDto);
        return Ok(paper);
    }

    [HttpPut]
    [Route("")]
    public ActionResult<Paper> UpdatePaper(UpdatePaperDto updatePaperDto)
    {
        var paper = service.UpdatePaper(updatePaperDto);
        return Ok(paper);
    }

    [HttpDelete]
    [Route("/api/[controller]/{id}")]
    public ActionResult<Paper> DeletePaper(int id)
    {
        service.DeletePaper(id);
        return NoContent();
    }

    [HttpGet]
    [Route("")]
    public ActionResult<List<PaperDto>> GetAllPapers()
    {
        var papers = service.GetAllPapers();
        return Ok(papers);
    }

    [HttpGet]
    [Route("/api/[controller]/{id}")]
    public ActionResult<Paper> GetPaperById(int id)
    {
        var paper = service.GetPaperById(id);
        return Ok(paper);
    }
    
    [HttpPost]
    [Route("/api/[controller]/addPropertyToPaper")]
    public ActionResult<Paper> AddPropertyToPaper(int paperId, int propertyId)
    {
        service.AddPropertyToPaper(paperId, propertyId);
        return NoContent();
    }
    
    [HttpDelete]
    [Route("/api/[controller]/removePropertyFromPaper")]
    public ActionResult<Paper> RemovePropertyFromPaper(int paperId, int propertyId)
    {
        service.RemovePropertyFromPaper(paperId, propertyId);
        return NoContent();
    }
    
    [HttpGet]
    [Route("/api/[controller]/getPaperProperties")]
    public ActionResult<List<Property>> GetPaperProperties(int paperId)
    {
        var properties = service.GetPaperProperties(paperId);
        return Ok(properties);
    }

    [HttpGet]
    [Route("/api/[controller]/getPaperByPrice")]
    public ActionResult<List<PaperDto>> GetPaperByPrice()
    {
        var papers = service.GetPapersByPrice();
        return Ok(papers);
    }
    
    
    [HttpGet]
    [Route("/api/[controller]/getPaperByName")]
    public ActionResult<List<PaperDto>> GetPaperByName()
    {
        var papers = service.GetPapersByName();
        return Ok(papers);
    }
    
    
}