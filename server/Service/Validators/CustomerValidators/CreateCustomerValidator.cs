using FluentValidation;
using Service.TransferModels.Requests;

namespace Service.Validators;

public class CreateCustomerValidator : AbstractValidator<CreateCustomerDto>
{

    public CreateCustomerValidator()
    {
        RuleFor(x => x.Name.Length).GreaterThan(1);
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Phone).NotEmpty();
        RuleFor(x => x.Address).NotEmpty();
    }

}