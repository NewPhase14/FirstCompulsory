import React from "react";
import CreatePaper from "./CreatePaper";
import CreateProperty from "./CreateProperty.tsx";

//Used to get CreatePaper and CreateProperty buttons on same line

export default function ParentPaperProperty() {
    return (
        <div className="mt-4 flex justify-center space-x-4">
            <CreatePaper />
            <CreateProperty />
        </div>
    );
}
