import React from "react";
import { toast } from "react-hot-toast";

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
    return (
        isOpen && (
            <div className="modal modal-open">
                <div className="modal-box w-full max-w-5xl">
                    <div className="flex">
                        {/* Left Side: Form */}
                        <div className="w-1/2 pr-4 border-r">
                            <h2 className="text-2xl font-bold mb-4">Create New Property</h2>
                            <input
                                type="text"
                                placeholder="Property Name"
                                className="input input-bordered w-full mb-4"
                                value={formData.name}
                                onChange={(e) => onChange({ ...formData, name: e.target.value })}
                            />
                            <div className="flex justify-between mt-8">
                                <button className="btn btn-secondary" onClick={onClose}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={() => onConfirm(formData)}>
                                    Confirm
                                </button>
                            </div>
                        </div>

                        {/* Right Side: List of Properties */}
                        <div className="w-1/2 pl-4">
                            <h2 className="text-2xl font-bold mb-4">Property List</h2>


                            {selectedProperty && (
                                <button
                                    className="btn btn-error mb-4"
                                    onClick={() => onDelete(selectedProperty.id)}
                                >
                                    Delete Selected Property
                                </button>
                            )}

                            <ul className="overflow-y-auto h-64">
                                {properties.length > 0 ? (
                                    properties.map((property) => (
                                        <li
                                            key={property.id}
                                            className={`p-2 mb-2 border-b cursor-pointer ${
                                                selectedProperty?.id === property.id
                                                    ? "bg-gray-200 border-blue-500"
                                                    : ""
                                            }`}
                                            onClick={() => onSelectProperty(property)}
                                        >
                                            {property.name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No properties available</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default PropertyModal;
