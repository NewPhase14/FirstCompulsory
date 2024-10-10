import React from "react";

const PropertiesModificationModal = ({ isOpen, onClose, allProperties }) => {
    if (!isOpen) return null; // Don't render anything if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-6 text-gray-800">Properties</h2> {/* Title for properties viewing */}

                <div className="grid grid-cols-2 gap-4">
                    {/* Left Section: All Properties */}
                    <div>
                        <h3 className="font-bold mb-4">All Properties</h3>
                        {allProperties.length > 0 ? (
                            allProperties.map((property, index) => (
                                <div key={index} className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {property.propertyName}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p>No properties available.</p>
                        )}
                    </div>

                    {/* Right Section: Assigned Properties */}
                    <div>
                        <h3 className="font-bold mb-4">Assigned Properties</h3>
                            <p>No assigned properties available.</p>
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <button
                        className="bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertiesModificationModal;
