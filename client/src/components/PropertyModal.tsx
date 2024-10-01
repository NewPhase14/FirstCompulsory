import React from "react";
import { toast } from "react-hot-toast";

const PropertyModal = ({ isOpen, onClose, formData, onChange, onConfirm }) => {

    return (
        isOpen && (
            <div className="modal modal-open">
                <div className="modal-box">
                    <h2 className="text-2xl font-bold mb-4">Create New Property</h2>
                    <input
                        type="text"
                        placeholder="Property Name"
                        className="input input-bordered w-full mb-4"
                        value={formData.name}
                        onChange={(e) => onChange({...formData, name: e.target.value})}
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
            </div>
        )
    );
};

export default PropertyModal;
