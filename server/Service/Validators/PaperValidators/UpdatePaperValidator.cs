using FluentValidation;
using Service.TransferModels.Requests;

namespace Service.Validators;

public class UpdatePaperValidator : AbstractValidator<UpdatePaperDto>
{
    public UpdatePaperValidator()
    {
        
        RuleFor(x => x.Name.Length).GreaterThan(1);
        RuleFor(x => x.Stock).GreaterThan(1);
        RuleFor(x => x.Price).GreaterThan(1);
    }
}