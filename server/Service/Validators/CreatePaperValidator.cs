using FluentValidation;
using Service.TransferModels.Requests;

namespace Service.Validators;

public class CreatePaperValidator : AbstractValidator<CreatePaperDto>
{
    public CreatePaperValidator()
    {
       
    }
    
}