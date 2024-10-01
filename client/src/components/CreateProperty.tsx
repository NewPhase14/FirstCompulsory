
import React, { useState } from "react";
import { useAtom } from "jotai";
import { PropertyAtom } from "../atoms/PropertyAtom.tsx";
import { http } from "../http";
import toast from "react-hot-toast";
import PropertyModal from "./PropertyModal";

export default function CreateProperty() {
    const [properties, setProperties] = useAtom(PropertyAtom);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
    });

    const handleConfirm = async (data) => {
        const newProperty = { name: data.name };

        try {
            const response = await http.api.propertyCreateProperty(newProperty);
            if (response && response.data) {
                setProperties([...properties, response.data]);
                toast.success("Property created successfully!");
                setShowPopup(false);
            } else {
                throw new Error("Failed to create property.");
            }
        } catch (error) {
            toast.error("Failed to create property.");
            console.error(error);
        } finally {
            setFormData({ name: "" });
        }
    };

    return (
        <div >

            <button
                className="btn"
                onClick={() => {
                    setFormData({ name: "" });
                    setShowPopup(true);
                }}
            >
                Create Property
            </button>

            <PropertyModal
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                formData={formData}
                onChange={setFormData}
                onConfirm={handleConfirm}
            />
        </div>
    );
}
