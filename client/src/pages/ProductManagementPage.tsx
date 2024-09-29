import Navbar from "../components/Navbar.tsx";
import ProductTable from "../components/ProductTable.tsx";
import CreatePaper from "../components/CreatePaper.tsx";
import { Toaster } from 'react-hot-toast';
import {useInitializeData} from "../useInitializeData.ts";

export default function ProductManagementPage() {

    useInitializeData();

  return (
    <>
      <Navbar />
        < CreatePaper />
      <ProductTable />
        <Toaster position={"top-right"}/>
    </>
  );
}
