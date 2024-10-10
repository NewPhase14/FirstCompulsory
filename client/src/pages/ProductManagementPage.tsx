import Navbar from "../components/Navbar.tsx";
import ProductTable from "../components/ProductTable.tsx";
import ParentPaperProperty from "../components/ParentPaperProperty.tsx";
import { Toaster } from "react-hot-toast";

export default function ProductManagementPage() {
  return (
    <>
      <Navbar />
      <Toaster position={"top-right"} />
      <ParentPaperProperty />
      <ProductTable />
    </>
  );
}
