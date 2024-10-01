using FluentValidation;
using Service.TransferModels.Requests.Property;

namespace Service.Validators.PropertyValidators;

public class CreatePropertyValidator : AbstractValidator<CreatePropertyDto>
{
    public CreatePropertyValidator()
    {
        RuleFor(x => x.Name.Length).GreaterThan(3);
    }
}