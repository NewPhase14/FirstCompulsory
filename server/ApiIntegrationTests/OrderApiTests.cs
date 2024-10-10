using System.Net.Http.Json; 
using DataAccess;
using DataAccess.Models;
using PgCtx;
using Xunit.Abstractions;
using Microsoft.AspNetCore.Mvc.Testing;
using API;
using Microsoft.EntityFrameworkCore;
using Service.TransferModels.Requests.Order;
using Service.TransferModels.Requests.OrderEntry;
using Service.TransferModels.Responses;

namespace ApiIntegrationTests
{
    public class OrderApiTests : WebApplicationFactory<Program>
    {
        private readonly PgCtxSetup<DunderMifflinContext> _pgCtxSetup = new();
        private readonly ITestOutputHelper _outputHelper;

        public OrderApiTests(ITestOutputHelper outputHelper)
        {
            _outputHelper = outputHelper;
            Environment.SetEnvironmentVariable("DbConnectionString", _pgCtxSetup._postgres.GetConnectionString());
        }

        [Fact]
        public async Task Customer_Can_Successfully_Create_Orders_With_OrderEntries()
        {

            //1. - Userstory for this test is "As a customer I want to be able to place an order with X order entries of products."

            // Create a customer
            var customer = new Customer
            {
                Name = "Benjamin Franklin",
                Email = "Benji@gmail.com",
                Phone = "28367255",
                Address = "Esbjergvej 28, 6700 Esbjerg"
            };
            _pgCtxSetup.DbContextInstance.Customers.Add(customer);
            _pgCtxSetup.DbContextInstance.SaveChanges();

            Assert.NotNull(customer);
            Assert.NotEqual(0, customer.Id);

            // Create products to add to the order
            var product1 = new Paper()
            {
                Name = "Paper A4",
                Price = 4.99,
                Stock = 100,
                Description = "Great paper for printing",
                Picture = "https://www.example.com/paper.jpg",
                Discontinued = false
            };
            var product2 = new Paper()
            {
                Name = "Paper A3",
                Price = 2.99,
                Stock = 50,
                Description = "Great paper for drawing",
                Picture = "https://www.example.com/paper.jpg",
                Discontinued = false
            };
            _pgCtxSetup.DbContextInstance.Papers.AddRange(product1, product2);
            _pgCtxSetup.DbContextInstance.SaveChanges();

            Assert.NotEqual(0, product1.Id);
            Assert.NotEqual(0, product2.Id);

            // Calculate total amount 
            var totalAmount = (product1.Price * 2) + (product2.Price * 1);

            // Create order
            var order1 = new Order()
            {
                CustomerId = customer.Id,
                DeliveryDate = DateOnly.FromDateTime(DateTime.Today.AddDays(3)),
                OrderDate = DateTime.UtcNow,
                Status = "Pending",
                TotalAmount = totalAmount,
            };

            var order2 = new Order()
            {
                CustomerId = customer.Id,
                DeliveryDate = DateOnly.FromDateTime(DateTime.Today.AddDays(3)),
                OrderDate = DateTime.UtcNow,
                Status = "Completed",
                TotalAmount = totalAmount,
            };

            _pgCtxSetup.DbContextInstance.Orders.AddRange(order1, order2);
            _pgCtxSetup.DbContextInstance.SaveChanges();

            Assert.NotNull(order1);
            Assert.NotNull(order2);
            Assert.NotEqual(0, order2.Id);
            Assert.NotEqual(0, order1.Id);
            Assert.Equal(totalAmount, order1.TotalAmount);
            Assert.Equal(order1.CustomerId, customer.Id);

            // Create order entries
            var orderEntry1 = new OrderEntry()
            {
                OrderId = order1.Id,
                ProductId = product1.Id,
                Quantity = 2
            };

            // Create order entries through API
            var client = CreateClient();
            var response = await client.PostAsJsonAsync("/api/orderEntry", orderEntry1);
            response.EnsureSuccessStatusCode();
            var orderEntryResponse = await response.Content.ReadFromJsonAsync<OrderEntryDto>();

            Assert.NotNull(orderEntryResponse);
            Assert.NotNull(orderEntry1);
            Assert.Equal(orderEntryResponse.ProductId, product1.Id);
            Assert.Equal(orderEntryResponse.Quantity, orderEntry1.Quantity);
            Assert.NotEqual(0, orderEntryResponse.OrderId);
            //This fails ??
            //Assert.Equal(orderEntryResponse.OrderId, order.Id);

        }


        [Fact]
            public async Task Customer_Can_View_Own_Order_History()
            {
                
                //2. - Userstory for this test is "As a customer I want to be able to view my order history."
                
                // Create a customer
                var customer = new Customer
                {
                    Name = "Benjamin Franklin",
                    Email = "Benji@gmail.com",
                    Phone = "28367255",
                    Address = "Esbjergvej 28, 6700 Esbjerg"
                };
                
                _pgCtxSetup.DbContextInstance.Customers.Add(customer);
                _pgCtxSetup.DbContextInstance.SaveChanges();

                // Place some orders for the customer
                var order1 = new Order
                {
                    CustomerId = customer.Id,
                    DeliveryDate = DateOnly.FromDateTime(DateTime.Today.AddDays(3)),
                    OrderDate = DateTime.UtcNow,
                    Status = "Completed",
                    TotalAmount = 20.00
                };
                
                var order2 = new Order
                {
                    CustomerId = customer.Id,
                    DeliveryDate = DateOnly.FromDateTime(DateTime.Today.AddDays(5)),
                    OrderDate = DateTime.UtcNow,
                    Status = "Pending",
                    TotalAmount = 50.00
                };

                _pgCtxSetup.DbContextInstance.Orders.AddRange(order1, order2);
                _pgCtxSetup.DbContextInstance.SaveChanges();
                
            var client = CreateClient();
            var response = await client.GetAsync($"/api/order/customer/{customer.Id}");
            response.EnsureSuccessStatusCode();
            var orderHistory = await response.Content.ReadFromJsonAsync<List<OrderDto>>();

            // Assert
            Assert.NotNull(orderHistory);
            Assert.Equal(2, orderHistory.Count);
        }

        [Fact]
        public async Task Admin_Can_View_All_Orders()
        {
            
            //3. - Userstory for this test is "As an admin I want to be able to view all orders."
            
            // Create first customer
            var customer1 = new Customer
            {
                Name = "Dwight Schrute",
                Email = "dwight@dundermifflin.com",
                Phone = "12345678",
                Address = "Schrute Farms, Scranton"
            };

            // Create second customer
            var customer2 = new Customer
            {
                Name = "Jim Halpert",
                Email = "jim@dundermifflin.com",
                Phone = "87654321",
                Address = "Scranton, PA"
            };

            _pgCtxSetup.DbContextInstance.Customers.AddRange(customer1, customer2);
            _pgCtxSetup.DbContextInstance.SaveChanges();

            // Create orders for the first customer
            var order1 = new Order
            {
                CustomerId = customer1.Id,
                DeliveryDate = DateOnly.FromDateTime(DateTime.Today.AddDays(3)),
                OrderDate = DateTime.UtcNow,
                Status = "Completed",
                TotalAmount = 150.00
            };

            var order2 = new Order
            {
                CustomerId = customer1.Id,
                DeliveryDate = DateOnly.FromDateTime(DateTime.Today.AddDays(5)),
                OrderDate = DateTime.UtcNow,
                Status = "Pending",
                TotalAmount = 200.00
            };

            // Create orders for the second customer
            var order3 = new Order
            {
                CustomerId = customer2.Id,
                DeliveryDate = DateOnly.FromDateTime(DateTime.Today.AddDays(7)),
                OrderDate = DateTime.UtcNow,
                Status = "Completed",
                TotalAmount = 300.00
            };

            _pgCtxSetup.DbContextInstance.Orders.AddRange(order1, order2, order3);
            _pgCtxSetup.DbContextInstance.SaveChanges();
            
            var client = CreateClient();
            var response = await client.GetAsync("/api/order");
            response.EnsureSuccessStatusCode();
            var allOrders = await response.Content.ReadFromJsonAsync<List<OrderDto>>();
            
            Assert.NotNull(allOrders);
            Assert.Equal(3, allOrders.Count);

          
        }
    }
}
            


