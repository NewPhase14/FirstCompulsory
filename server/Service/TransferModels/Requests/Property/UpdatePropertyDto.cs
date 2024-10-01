namespace Service.TransferModels.Requests.Property;

public class UpdatePropertyDto
{
    public int Id { get; set; }
    public string Name { get; set; }


    public DataAccess.Models.Property ToProperty()
    {
        return new DataAccess.Models.Property
        {
            Id = Id,
            PropertyName = Name
        };
    }
}