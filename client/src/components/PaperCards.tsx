import React, { useState } from "react";
import { useAtom } from "jotai";
import {
  PaperAtom,
  PaperByNameAtom,
  PaperByPriceAtom,
} from "../atoms/PaperAtom";
import { OrderEntryAtom } from "../atoms/OrderEntryAtom";
import { OrderEntry, Paper } from "../Api";
import { toast } from "react-hot-toast";

export default function PaperCards() {
  const [papers] = useAtom(PaperAtom);
  const [papersByPrice] = useAtom(PaperByPriceAtom);
  const [papersByName] = useAtom(PaperByNameAtom);
  const [selectedOrderBy, setSelectedOrderBy] =
    useState<Paper[]>(papersByPrice);

  const [orderEntries, setOrderEntries] = useAtom(OrderEntryAtom);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    paperId: number,
  ) => {
    const value = parseInt(event.target.value);
    setQuantities((prev) => ({
      ...prev,
      [paperId]: value >= 0 ? value : 0, // Ensure non-negative values
    }));
  };

  const createOrderEntry = (paper: Paper) => {
    const quantity = quantities[paper.id!] || 0; // Default to 0 if not set

    if (quantity === 0) {
      toast.error("Quantity can't be zero. Please enter a valid quantity.");
      return;
    }

    const updatedOrderEntry: OrderEntry = {
      productId: paper.id,
      quantity: quantity,
      product: paper,
    };

    const newValue = [...orderEntries, updatedOrderEntry];
    setOrderEntries(newValue);
    localStorage.setItem("orderEntries", JSON.stringify(newValue));

    toast.success(
      `Successfully added ${quantity} ${paper.name}(s) to the order!`,
    );
    setQuantities({ ...quantities, [paper.id!]: 0 }); // Reset quantity to 0
  };

  function handleSelectedOrderBy(orderBy: number) {
    if (orderBy == 1) {
      setSelectedOrderBy(papersByPrice!);
      console.log(selectedOrderBy);
    }
    if (orderBy == 2) {
      setSelectedOrderBy(papersByName!);
    }
  }

  return (
    <>
      <select className="select w-full max-w-xs">
        <option disabled selected>
          Order by
        </option>
        <option>Order by price</option>
        <option>Order by name</option>
      </select>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-4 m-5">
          {selectedOrderBy.map((paper) => {
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
                    htmlFor={`quantity-${paper.id}`}
                    className="block text-sm font-medium text-gray-700 mt-4"
                  >
                    Quantity
                  </label>
                  <input
                    id={`quantity-${paper.id}`}
                    type="number"
                    min={0}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter quantity"
                    value={quantities[paper.id!] || ""}
                    onChange={(event) => handleQuantityChange(event, paper.id!)}
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
    </>
  );
}
