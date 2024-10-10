import Navbar from "../components/Navbar.tsx";
import { useAtom } from "jotai";
import { OrderEntryAtom } from "../atoms/OrderEntryAtom.tsx";
import { getTotalCost } from "../components/getTotalCost.ts";
import { Customer, OrderEntry } from "../Api.ts";
import { useState } from "react";

export default function ShoppingCartPage() {
  const [orderEntry, setOrderEntry] = useAtom(OrderEntryAtom);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  function updateQuantity(orderEntry: OrderEntry, quantity: number) {
    orderEntry.quantity = quantity;
    console.log(orderEntry);
  }

  function createCustomer() {}

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <div key="0" className="w-1/2 max-w-lg mx-auto my-10 overflow-auto">
          <h1>Shopping Cart</h1>
          <p>You have {orderEntry.length} items in your cart</p>
          {orderEntry.map((oe) => {
            return (
              <div
                key={oe.id}
                className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between my-4"
              >
                <img
                  src={oe.product?.picture!}
                  alt="Product"
                  className="w-16 h-16 rounded-md object-cover"
                />

                <div className="ml-4 flex-grow">
                  <h2 className="text-lg font-semibold">{oe.product?.name}</h2>
                  <p className="text-gray-500">{oe.product?.description}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex flex-col">
                    <input
                      id="quantity"
                      type="number"
                      onChange={(e) =>
                        updateQuantity(oe, Number.parseInt(e.target.value))
                      }
                      min={0}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter quantity"
                    />
                  </div>
                </div>

                <div className="ml-4">
                  <span className="text-lg font-medium">
                    {oe.quantity! * oe.product?.price!}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-1/2">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full my-10">
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    name: e.target.value,
                  })
                }
                placeholder="Name"
                className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2"
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
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    address: e.target.value,
                  })
                }
                placeholder="Address"
                className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
                className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    phone: e.target.value,
                  })
                }
                placeholder="Phone"
                className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2"
              />
            </div>

            <div className="flex justify-between items-center border-t border-gray-600 pt-4 mt-4">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="text-lg font-bold">${getTotalCost()}</span>
            </div>

            <button
              onClick={}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
