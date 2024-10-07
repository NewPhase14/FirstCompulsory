import React from "react";

const ProductModal = ({ isOpen, onClose, formData, onChange, onConfirm }) => {
    if (!isOpen) return null; // Don't render anything if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="font-bold mb-4">Product Details</h2>

                <div className="mb-4">
                    <label className="label">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
                        className="input input-bordered w-full"
                        placeholder="Enter price"
                    />
                </div>

                <div className="mb-4">
                    <label className="label">Picture URL:</label>
                    <input
                        type="text"
                        name="picture"
                        value={formData.picture}
                        onChange={onChange}
                        className="input input-bordered w-full"
                        placeholder="Enter picture URL"
                    />
                </div>

                <div className="mb-4">
                    <label className="label">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={onChange}
                        className="input input-bordered w-full"
                        placeholder="Enter description"
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
                                onChange={onChange}
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
                                onChange={onChange}
                                className="radio"
                            />
                            No
                        </label>
                    </div>
                </div>

                <div className="flex justify-between mt-8">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={() => onConfirm(formData)}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
