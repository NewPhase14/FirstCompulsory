import React, { useEffect } from "react";
import { useInitializeData } from "../useInitializeData.ts";
import Navbar from "../components/Navbar.tsx";
import PaperTable from "../components/PaperTable.tsx";

export default function ProductCatalog() {
  useEffect(() => {}, []);

  useInitializeData();

  return (
    <>
      <Navbar />
      <PaperTable />
    </>
  );
}
