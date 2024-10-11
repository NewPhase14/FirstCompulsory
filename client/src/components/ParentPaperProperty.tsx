import React from "react";
import CreatePaper from "./CreatePaper";
import CreateProperty from "./CreateProperty.tsx";

export default function ParentPaperProperty() {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 ml-auto">
                <CreatePaper />
                <CreateProperty />
            </div>
        </div>
    );
}
