import React from "react";

const ProductModal = ({ isOpen, onClose, formData, onChange, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl flex">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Product Details
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Stock:
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
              placeholder="Enter stock amount"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price:
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
              placeholder="Enter price"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Picture URL:
            </label>
            <input
              type="text"
              name="picture"
              value={formData.picture}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
              placeholder="Enter picture URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
              placeholder="Enter description"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Discontinued:
            </label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="discontinued"
                  value="yes"
                  checked={formData.discontinued === "yes"}
                  onChange={onChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="discontinued"
                  value="no"
                  checked={formData.discontinued === "no"}
                  onChange={onChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              className="bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-700"
              onClick={() => onConfirm(formData)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
