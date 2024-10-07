using System.Net.Http.Json; // For PostAsJsonAsync
using System.Text.Json; // For JsonSerializerOptions
using DataAccess;
using DataAccess.Models;
using PgCtx;
using Xunit.Abstractions;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;
using System.Threading.Tasks;
using System.Linq;
using API;

namespace ApiIntegrationTests
{
    public class OrderApiTests : WebApplicationFactory<Program>
    {
        private readonly PgCtxSetup<DunderMifflinContext> _pgCtxSetup = new();
        private readonly ITestOutputHelper _outputHelper;

        public OrderApiTests(ITestOutputHelper outputHelper)
        {
            _outputHelper = outputHelper;
            Environment.SetEnvironmentVariable("DATABASE", _pgCtxSetup._postgres.GetConnectionString());
        }

  [Fact]
public async Task Customer_Can_Successfully_Create_Orders()
{
    // Arrange: Define the customer object
    var customer = new Customer
    {
        Name = "John Doe",
        Email = "johndoeE@example.com",
        Phone = "123-456-7890",
        Address = "123 Main St"
    };

    // Create an HTTP client to interact with the API
    var client = CreateClient();

    // Send a POST request to create the customer via the API
    var customerResponse = await client.PostAsJsonAsync("/api/Customer", customer);

    // Ensure the customer creation response status is success
    customerResponse.EnsureSuccessStatusCode();

    // Deserialize the created customer from the response
    var createdCustomer = JsonSerializer.Deserialize<Customer>(
        await customerResponse.Content.ReadAsStringAsync(),
        new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
    );

    // Ensure the customer was successfully created and has a valid ID
    Assert.NotNull(createdCustomer);
    Assert.NotEqual(0, createdCustomer.Id);


            }
}
}
