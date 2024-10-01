using FluentValidation;
using Service.TransferModels.Requests.OrderEntry;

namespace Service.Validators.OrderEntryValidators;

public class CreateOrderEntryValidator : AbstractValidator<CreateOrderEntryDto>
{
    public CreateOrderEntryValidator()
    {
        RuleFor(x => x.Quantity).GreaterThan(0);
    }
}