import Navbar from "../Navbar.tsx";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { OrderEntryAtom, getTotalCost, Customer, CreateCustomerDto, CreateOrderDto, CreateOrderEntryDto, http } from "../import.ts";

export default function ShoppingCartPage() {
  const [orderEntry, setOrderEntry] = useAtom(OrderEntryAtom);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  async function createCustomer() {
    try {
      const customerData: CreateCustomerDto = {
        name: newCustomer.name,
        address: newCustomer.address,
        phone: newCustomer.phone,
        email: newCustomer.email,
      };

      const response = await http.api.customerCreateCustomer(customerData);
      return response.data.id; // Return the newly created customer's ID
    } catch (err) {
      toast.error("Failed to create customer. Please check your input.");
      console.error(err);
    }
  }

  async function createOrder(customerId: number) {
    const orderEntries: CreateOrderEntryDto[] = orderEntry.map((oe) => ({
      quantity: oe.quantity,
      productId: oe.product?.id,
    }));

    const orderData: CreateOrderDto = {
      customerId,
      orderEntries,
    };

    try {
      await http.api.orderCreateOrder(orderData);
      setOrderEntry([]);
      toast.success("Order created successfully!");
    } catch (err) {
      toast.error("Failed to create order. Please try again.");
      console.error(err);
    }
  }

  const handleCheckout = async () => {
    const customerId = await createCustomer();
    if (customerId) {
      await createOrder(customerId);
      localStorage.removeItem("orderEntries");
      setNewCustomer({
        name: "",
        address: "",
        phone: "",
        email: "",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-50 pt-32 p-5">
        {/* Shopping Cart Items */}
        <div className="w-full md:w-1/2 max-w-lg mx-auto my-10 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-gray-600 mb-2">
            You have {orderEntry.length} items in your cart
          </p>
          {orderEntry.map((oe) => (
            <div
              key={oe.id}
              className="p-4 bg-white shadow rounded-lg flex items-center justify-between my-4"
            >
              <img
                src={oe.product?.picture!}
                alt="Product"
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="ml-4 flex-grow">
                <h2 className="text-lg font-semibold text-gray-800">
                  {oe.product?.name}
                </h2>
                <p className="text-gray-500">{oe.product?.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <input
                    id="quantity"
                    type="number"
                    value={oe.quantity}
                    min={0}
                    className="mt-1 block w-20 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Qty"
                  />
                </div>
              </div>
              <div className="ml-4">
                <span className="text-lg font-medium">
                  ${(oe.quantity! * oe.product?.price!).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Details */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full my-10 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Checkout Details</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={newCustomer.name}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, name: e.target.value })
                }
                placeholder="Name"
                className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={newCustomer.address!}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, address: e.target.value })
                }
                placeholder="Address"
                className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={newCustomer.email!}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, email: e.target.value })
                }
                placeholder="Email"
                className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={newCustomer.phone!}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, phone: e.target.value })
                }
                placeholder="Phone"
                className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-between items-center border-t border-gray-600 pt-4 mt-4">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="text-lg font-bold">
                ${getTotalCost().toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
