using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests;

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
    public ActionResult<List<Paper>> GetAllPapers()
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
}