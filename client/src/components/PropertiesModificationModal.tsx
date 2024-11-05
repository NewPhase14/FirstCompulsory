import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

import { http, Property  } from "./import.ts";

const PropertiesModificationModal = ({
  isOpen,
  onClose,
  allProperties,
  paperId,
}) => {
  const [propertiesByPaperId, setPropertiesByPaperId] = useState<Property[]>(
    [],
  );

  useEffect(() => {
    if (isOpen && paperId) {
      const fetchAssignedProperties = async () => {
        try {
          const response = await http.api.paperGetPaperProperties({
            paperId,
          });
          setPropertiesByPaperId(response.data || []);
        } catch (error) {
          console.error("Failed to fetch assigned properties.");
          toast.error("Failed to fetch assigned properties.");
        }
      };
      fetchAssignedProperties();
    }
  }, [isOpen, paperId]);

  if (!isOpen) return null;

  const handlePropertyDoubleClick = async (propertyId) => {
    try {
      const response = await http.api.paperAddPropertyToPaper({
        paperId,
        propertyId,
      });
      if (response.status === 204) {
        toast.success("Property added successfully!");
        setPropertiesByPaperId((prev) => [
          ...prev,
          allProperties.find((p) => p.id === propertyId),
        ]);
      }
    } catch (error) {
      console.error("Failed to add property.");
      toast.error("Failed to add property.");
    }
  };

  const handlePropertyRemove = async (propertyId) => {
    try {
      const response = await http.api.paperRemovePropertyFromPaper({
        paperId,
        propertyId,
      });
      if (response.status === 204) {
        toast.success("Property removed successfully!");
        setPropertiesByPaperId((prev) =>
          prev.filter((property) => property.id !== propertyId),
        );
      }
    } catch (error) {
      console.error("Failed to remove property.");
      toast.error("Failed to remove property.");
    }
  };

  const unassignedProperties = allProperties.filter(
    (property) => !propertiesByPaperId.some((p) => p.id === property.id),
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <Toaster position={"top-right"}></Toaster>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Properties</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-4">Available Properties</h3>
            {unassignedProperties.length > 0 ? (
              unassignedProperties.map((property) => (
                <div key={property.id}>
                  <button
                    className="mb-2"
                    onClick={() => handlePropertyDoubleClick(property.id)}
                  >
                    {property.propertyName} (Add)
                  </button>
                </div>
              ))
            ) : (
              <p>All properties are assigned.</p>
            )}
          </div>

          <div>
            <h3 className="font-bold mb-4">Assigned Properties</h3>
            {propertiesByPaperId.length > 0 ? (
              propertiesByPaperId.map((property) => (
                <div key={property.id}>
                  <button
                    className="mb-2 text-red-600"
                    onClick={() => handlePropertyRemove(property.id)}
                  >
                    {property.propertyName} (Remove)
                  </button>
                </div>
              ))
            ) : (
              <p>No assigned properties available.</p>
            )}
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
