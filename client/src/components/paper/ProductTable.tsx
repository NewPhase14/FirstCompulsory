import React, { useState } from "react";
import { useAtom } from "jotai";
import ProductModal from "./ProductModal.tsx";
import PropertiesModificationModal from "../PropertiesModificationModal.tsx";
import { toast } from "react-hot-toast";

import { PaperAtom, PropertyAtom, http } from "../import.ts";

export default function ProductTable() {
  const [papers, setPapers] = useAtom(PaperAtom);
  const [allProperties] = useAtom(PropertyAtom); // Use the PropertyAtom
  const [showPopup, setShowPopup] = useState(false);
  const [showPropertiesPopup, setShowPropertiesPopup] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    stock: "",
    price: "",
    discontinued: "no",
    picture: "",
    description: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const openEditModal = (paper) => {
    setFormData({
      id: paper.id,
      name: paper.name || "",
      stock: paper.stock,
      price: paper.price,
      discontinued: paper.discontinued ? "yes" : "no",
      picture: paper.picture || "",
      description: paper.description || "",
    });
    setShowPopup(true);
  };

  const deletePaper = async (paperId) => {
    try {
      await http.api.paperDeletePaper(paperId);
      setPapers((prev) => prev.filter((paper) => paper.id !== paperId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error(error);
    }
  };

  const handleConfirm = async (data) => {
    const updatedPaper = {
      id: data.id,
      name: data.name,
      discontinued: data.discontinued === "yes",
      stock: parseInt(data.stock, 10) || 0,
      price: parseFloat(data.price) || 0.0,
      picture: data.picture,
      description: data.description,
    };

    try {
      const response = await http.api.paperUpdatePaper(updatedPaper);
      console.log("Update response:", response);
      if (response?.data) {
        setPapers((prev) =>
          prev.map((paper) => (paper.id === data.id ? response.data : paper)),
        );
        toast.success("Product updated successfully!");
      }
      setShowPopup(false);
    } catch (error) {
      toast.error("Failed to update product.");
      console.error("Update error:", error);
    }
  };

  const openPropertiesModal = async (paperId) => {
    setShowPropertiesPopup(true);
    setSelectedProduct(paperId);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-gray-600">Product</th>
              <th className="px-6 py-4 text-left text-gray-600">Stock</th>
              <th className="px-6 py-4 text-left text-gray-600">
                Discontinued
              </th>
              <th className="px-6 py-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {papers.length > 0 ? (
              papers.map((paper) => (
                <tr key={paper.id} className="hover:bg-gray-100 transition">
                  <td className="flex items-center px-6 py-4">
                    <img
                      className="mask mask-squircle h-12 w-12"
                      src={paper.picture}
                      alt={paper.name}
                    />
                    <span className="ml-4 font-medium text-gray-700">
                      {paper.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{paper.stock}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {paper.discontinued ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      className="btn btn-outline btn-xs text-blue-600 hover:bg-blue-600 hover:text-white transition"
                      onClick={() => openEditModal(paper)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline btn-xs text-red-600 hover:bg-red-600 hover:text-white transition"
                      onClick={() => deletePaper(paper.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-outline btn-xs text-green-600 hover:bg-green-600 hover:text-white transition"
                      onClick={() => openPropertiesModal(paper.id)} // Pass paper.id to fetch properties
                    >
                      Properties
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center text-gray-500" colSpan={4}>
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <ProductModal
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          formData={formData}
          onChange={handleInputChange}
          onConfirm={handleConfirm}
        />

        <PropertiesModificationModal
          isOpen={showPropertiesPopup}
          onClose={() => setShowPropertiesPopup(false)}
          allProperties={allProperties}
          paperId={selectedProduct}
        />
      </div>
    </div>
  );
}
