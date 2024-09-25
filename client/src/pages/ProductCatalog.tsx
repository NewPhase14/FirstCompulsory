import React, { useEffect } from "react";
import { useInitializeData } from "../useInitializeData.ts";
import Navbar from "../components/Navbar.tsx";
import PaperCards from "../components/PaperCards.tsx";

export default function ProductCatalog() {
  useEffect(() => {}, []);

  useInitializeData();

  return (
    <>
      <Navbar />
      <PaperCards />
    </>
  );
}
