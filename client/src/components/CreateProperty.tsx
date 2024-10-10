import React, { useState } from "react";
import { useAtom } from "jotai";
import { PropertyAtom } from "../atoms/PropertyAtom";
import { http } from "../http";
import toast from "react-hot-toast";
import PropertyModal from "./PropertyModal";

export default function CreateProperty() {
    const [properties, setProperties] = useAtom(PropertyAtom);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({ propertyName: "" });
    const [selectedProperty, setSelectedProperty] = useState(null);

    const handleConfirm = async (data) => {
        const newProperty = {
            name: data.propertyName
        };

        try {
            const response = await http.api.propertyCreateProperty(newProperty);
            if (response && response.data) {
                setProperties((prev) => [...prev, response.data]);
                toast.success("Property created successfully!");
                setShowPopup(false);
                setSelectedProperty(null);
                setFormData({ propertyName: "" });
            } else {
                throw new Error("Failed to create property.");
            }
        } catch (error) {
            toast.error("Failed to create property.");
            console.error(error);
        }
    };

    const handleDelete = async (propertyId) => {
        try {
            await http.api.propertyDeleteProperty(propertyId);
            setProperties((prev) => prev.filter((property) => property.id !== propertyId));
            toast.success("Property deleted successfully!");
            setSelectedProperty(null);
        } catch (error) {
            toast.error("Failed to delete property.");
            console.error(error);
        }
    };

    return (
        <div>
            <button
                className="square-button"
                onClick={() => {
                    setFormData({ propertyName: "" });
                    setShowPopup(true);
                }}
            >
                Create Property
            </button>

            {/* Modal component */}
            <PropertyModal
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                formData={formData}
                onChange={setFormData}
                onConfirm={handleConfirm}
                properties={properties}
                selectedProperty={selectedProperty}
                onSelectProperty={setSelectedProperty}
                onDelete={handleDelete}
            />
        </div>
    );
}
