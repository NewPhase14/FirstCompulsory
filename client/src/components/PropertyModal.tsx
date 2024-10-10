import React from "react";

const PropertyModal = ({
                           isOpen,
                           onClose,
                           formData,
                           onChange,
                           onConfirm,
                           properties,
                           selectedProperty,
                           onSelectProperty,
                           onDelete,
                       }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <div className="flex">
                    {/* Left Side: Form */}
                    <div className="w-1/2 pr-4 border-r">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Property</h2>
                        <input
                            type="text"
                            placeholder="Property Name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2 mb-4"
                            value={formData.propertyName}
                            onChange={(e) => {
                                onChange({ ...formData, propertyName: e.target.value });
                            }}
                        />
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

                    {/* Right Side: List of Properties */}
                    <div className="w-1/2 pl-4">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Property List</h2>
                        {selectedProperty && (
                            <button
                                className="bg-red-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-red-700 mb-4"
                                onClick={() => onDelete(selectedProperty.id)}
                            >
                                Delete property
                            </button>
                        )}
                        <ul className="overflow-y-auto h-64 border rounded-md border-gray-300">
                            {properties.length > 0 ? (
                                properties.map((property) => (
                                    <li
                                        key={property.id}
                                        className={`p-2 mb-2 border-b cursor-pointer ${
                                            selectedProperty?.id === property.id
                                                ? "bg-blue-100 border-blue-500"
                                                : "border-transparent"
                                        }`}
                                        onClick={() => {
                                            onSelectProperty(property);
                                        }}
                                    >
                                        {property.propertyName}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 p-2">No properties available</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyModal;
