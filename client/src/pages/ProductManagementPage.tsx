import Navbar from "../components/Navbar.tsx";
import ProductTable from "../components/ProductTable.tsx";
import ParentPaperProperty from "../components/ParentPaperProperty.tsx";
import { Toaster } from 'react-hot-toast';
import {useInitializeData} from "../useInitializeData.ts";

export default function ProductManagementPage() {

    useInitializeData();

  return (
    <>
      <Navbar />
        <ParentPaperProperty />
      <ProductTable />
        <Toaster position={"top-right"}/>
    </>
  );
}
