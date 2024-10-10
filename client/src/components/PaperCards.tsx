import React, { useState } from "react";
import { useAtom } from "jotai/index";
import { PaperAtom } from "../atoms/PaperAtom.tsx";
import { OrderEntryAtom } from "../atoms/OrderEntryAtom.tsx";
import { OrderEntry, Paper } from "../Api.ts";

export default function PaperCards() {
  const [papers] = useAtom(PaperAtom);
  const [orderEntries, setOrderEntries] = useAtom(OrderEntryAtom);
  const [newOrderEntry, setNewOrderEntry] = useState<OrderEntry>({
    productId: 1,
    quantity: 0,
    product: null,
  });

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-4 m-5">
        {papers.map((paper) => {
          return (
            <div
              key={paper.id}
              className="max-w-sm bg-white border rounded-lg shadow-lg p-6"
            >
              <img className="w-full" src={paper.picture!} alt="A4 paper" />
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {paper.name}
                </h2>
                <p className="mt-1 text-gray-600">{paper.description}</p>
                <p className="mt-2 text-gray-900 font-bold">${paper.price}</p>

                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  onChange={(e) =>
                    setNewOrderEntry({
                      ...newOrderEntry,
                      quantity: Number(e.target.value),
                    })
                  }
                  type="number"
                  min={0}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter quantity"
                />

                <button
                  onClick={() => createOrderEntry(paper)}
                  className="w-full mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  function createOrderEntry(paper: Paper) {
    const updatedOrderEntry: OrderEntry = {
      ...newOrderEntry,
      productId: paper.id,
      product: paper,
    };
    const newValue = [...orderEntries, updatedOrderEntry];
    setOrderEntries(newValue);
    localStorage.setItem("orderEntries", JSON.stringify(newValue));
  }
}
