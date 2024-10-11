import Navbar from "../components/Navbar.tsx";
import ProductTable from "../components/ProductTable.tsx";
import ParentPaperProperty from "../components/ParentPaperProperty.tsx";
import { Toaster } from "react-hot-toast";

export default function ProductManagementPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <Toaster position={"top-right"} />
            <div className="pt-32 px-5">
                <ParentPaperProperty />
                <ProductTable />
            </div>
        </div>
    );
}
