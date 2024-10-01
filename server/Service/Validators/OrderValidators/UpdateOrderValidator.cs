using FluentValidation;
using Service.TransferModels.Requests.Order;

namespace Service.Validators.OrderValidators;

public class UpdateOrderValidator : AbstractValidator<UpdateOrderDto>
{
    public UpdateOrderValidator()
    {
        RuleFor(x => x.OrderEntries).NotEmpty();
    }
}