import Navbar from "../components/Navbar.tsx";
import ProductTable from "../components/ProductTable.tsx";
import { Toaster } from 'react-hot-toast';
import {useInitializeData} from "../useInitializeData.ts";

export default function ProductManagementPage() {

    useInitializeData();

  return (
    <>
      <Navbar />
      <ProductTable />
        <Toaster position={"top-right"}/>
    </>
  );
}
