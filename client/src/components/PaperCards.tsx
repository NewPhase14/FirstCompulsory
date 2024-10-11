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
  const [papers, setPapers] = useAtom(PaperAtom);
  const [papersByPrice] = useAtom(PaperByPriceAtom);
  const [papersByName] = useAtom(PaperByNameAtom);
  const [orderEntries, setOrderEntries] = useAtom(OrderEntryAtom);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [sortOption, setSortOption] = useState("default");

  const handleQuantityChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      paperId: number
  ) => {
    const value = parseInt(event.target.value);
    setQuantities((prev) => ({
      ...prev,
      [paperId]: value >= 0 ? value : 0,
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
        `Successfully added ${quantity} ${paper.name}(s) to the order!`
    );
    setQuantities((prev) => ({ ...prev, [paper.id!]: 0 })); // Reset quantity to 0
  };

  const sortPapers = (papers: Paper[], sortOption: string) => {
    switch (sortOption) {
      case "price":
        return papersByPrice;
      case "name":
        return papersByName;
      default:
        return papers;
    }
  };

  const sortedPapers = sortPapers(papers, sortOption);

  return (
      <>
        <div className="bg-gray-50 min-h-screen pt-32 p-5"> {/* Lighter background for better contrast */}
          <div className="flex justify-end mb-12 ">
            <select
                className="select w-full max-w-xs text-gray-800 border border-blue-600 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
              <option disabled={true} value="default">
                Sort by
              </option>
              <option value="price">Price: Low to High</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"> {/* Increased spacing */}
              {sortedPapers.length === 0 ? (
                  <p className="text-gray-500">No products available.</p>
              ) : (
                  sortedPapers.map((paper) => (
                      <div
                          key={paper.id}
                          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:shadow-xl hover:scale-105"
                      >
                        <div className="h-48 overflow-hidden rounded-t-lg">
                          <img
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                              src={paper.picture}
                              alt={paper.name}
                          />
                        </div>
                        <div className="p-6">
                          <h2 className="text-xl font-bold text-black">
                            {paper.name}
                          </h2>
                          <p className="mt-2 text-gray-600">{paper.description}</p>
                          <p className="mt-4 text-black font-semibold text-lg">
                            ${paper.price}
                          </p>

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
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                              placeholder="Enter quantity"
                              value={quantities[paper.id!] || ""}
                              onChange={(event) => handleQuantityChange(event, paper.id!)}
                          />

                          <button
                              onClick={() => createOrderEntry(paper)}
                              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </>
  );
}
