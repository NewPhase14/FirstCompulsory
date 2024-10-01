import React, { useState } from "react";
import { useAtom } from "jotai";
import { PaperAtom } from "../atoms/PaperAtom.tsx";
import ProductModal from "./ProductModal";
import { http } from "../http";
import toast from "react-hot-toast";

export default function CreatePaper() {
    const [papers, setPapers] = useAtom(PaperAtom);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        stock: "",
        price: "",
        discontinued: "no",
        picture: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleConfirm = async (data) => {
        const newPaper = {
            name: data.name,
            discontinued: data.discontinued === "yes", // Convert string to boolean
            stock: parseInt(data.stock) || 0,
            price: parseFloat(data.price) || 0.0,
            picture: data.picture || null,
        };

        try {
            const response = await http.api.paperCreatePaper(newPaper);
            if (response && response.data) {
                setPapers([...papers, response.data]);
                toast.success("Paper created successfully!");
                setShowPopup(false);
            } else {
                throw new Error("Failed to create paper.");
            }
        } catch (error) {
            toast.error("Failed to create paper: " );
            console.error(error);
        }
    };

    return (
        <div>
            <button
                className="btn"
                onClick={() => {
                    setFormData({ name: "", stock: "", price: "", discontinued: "no", picture: "" });
                    setShowPopup(true);
                }}
            >
                Create product
            </button>

            <ProductModal
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                formData={formData}
                onChange={handleInputChange}
                onConfirm={handleConfirm}
            />
        </div>
    );
}