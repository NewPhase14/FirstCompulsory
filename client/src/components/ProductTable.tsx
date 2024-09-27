import React, { useState } from "react";
import { useAtom } from "jotai";
import { PaperAtom } from "../atoms/PaperAtom.tsx"; // Import the atom to manage paper state
import {toast} from 'react-hot-toast';

export default function ProductTable() {
    const [papers, setPapers] = useAtom(PaperAtom);

    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        stock: "",
        price: "",
        discontinued: "no",
    });

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle confirm button click
    const handleConfirm = () => {
        toast.success("Product details confirmed!");
        setShowPopup(false); // Close the popup
    };

    // Handle cancel button click
    const handleCancel = () => {
        toast.error("Changes canceled.");
        setShowPopup(false); // Close the popup
    };


    // Open the popup and populate the form with selected paper's data
    const openPopup = (paper) => {
        setFormData({
            name: paper.name || "",
            stock: paper.stock || "",
            price: paper.price || "",
            discontinued: paper.discontinued ? "yes" : "no", // Convert to string for radio input
        });
        setShowPopup(true); // Show the popup
    };


    return (
        <div className="overflow-x-auto m-5">
            <table className="table">
                <thead>
                <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Discontinued</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {papers && papers.length > 0 ? (
                    papers.map((paper) => (
                        <tr key={paper.id}>
                            <th>

                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={paper.picture!}
                                                alt={paper.name}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{paper.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{paper.stock ? "In Stock" : "Out of Stock"}</td>
                            <td>{paper.discontinued ? "Yes" : "No"}</td>
                            <th>
                                <button
                                    className="btn btn-ghost btn-xs"
                                    onClick={() => openPopup(paper)} // Open popup with paper details
                                >
                                    Details
                                </button>
                            </th>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="text-center" colSpan={5}>No products available.</td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Popup for editing product details */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="font-bold mb-4">Product Details</h2>

                        {/* Form fields for product details */}
                        <div className="mb-4">
                            <label className="label">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange} // Handle input change
                                className="input input-bordered w-full"
                                placeholder="Enter product name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="label">Stock:</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                placeholder="Enter stock amount"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="label">Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                placeholder="Enter price"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="label">Discontinued:</label>
                            <div className="flex gap-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="discontinued"
                                        value="yes"
                                        checked={formData.discontinued === "yes"}
                                        onChange={handleInputChange}
                                        className="radio"
                                    />
                                    Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="discontinued"
                                        value="no"
                                        checked={formData.discontinued === "no"}
                                        onChange={handleInputChange}
                                        className="radio"
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        {/* Buttons for canceling or confirming the update */}
                        <div className="flex justify-between mt-8">
                            <button
                                className="btn btn-secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
