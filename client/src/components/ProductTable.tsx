import React, { useState } from "react";
import { useAtom } from "jotai";
import { PaperAtom } from "../atoms/PaperAtom.tsx";
import ProductModal from "./ProductModal";
import { http } from "../http";
import { toast } from 'react-hot-toast';

export default function ProductTable() {
    const [papers, setPapers] = useAtom(PaperAtom);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        stock: "",
        price: "",
        discontinued: "no",
        picture: "",
    });

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
        });
        setShowPopup(true);
    };

    const handleConfirm = async (data) => {
        const updatedPaper = {
            id: data.id,
            name: data.name,
            discontinued: data.discontinued === "yes",
            stock: parseInt(data.stock) || 0,
            price: parseFloat(data.price) || 0.0,
            picture: data.picture,
        };

        try {
            const response = await http.api.paperUpdatePaper(updatedPaper); // Pass the updatedPaper object
            if (response && response.data) {
                setPapers((prevPapers) =>
                    prevPapers.map((paper) => (paper.id === data.id ? response.data : paper))
                );
                toast.success("Product updated successfully!");
            }
            setShowPopup(false);
        } catch (error) {
            toast.error("Failed to update product.");
            console.error(error);
        }
    };

    return (
        <div className="overflow-x-auto m-5">
            <table className="table">
                <thead>
                <tr>
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
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img src={paper.picture!} alt={paper.name} />
                                        </div>
                                    </div>
                                    <div className="font-bold">{paper.name}</div>
                                </div>
                            </td>
                            <td>{paper.stock}</td>
                            <td>{paper.discontinued ? "Yes" : "No"}</td>
                            <td>
                                <button
                                    className="btn btn-ghost btn-xs"
                                    onClick={() => openEditModal(paper)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="text-center" colSpan={5}>No products available.</td>
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
        </div>
    );
}
