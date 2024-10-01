using FluentValidation;
using Service.TransferModels.Requests.Property;

namespace Service.Validators.PropertyValidators;

public class UpdatePropertyValidator : AbstractValidator<UpdatePropertyDto>
{
    public UpdatePropertyValidator()
    {
        RuleFor(x => x.Name.Length).GreaterThan(3);
    }
}