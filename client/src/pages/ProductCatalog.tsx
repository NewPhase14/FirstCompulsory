import React, { useEffect } from "react";
import Navbar from "../components/Navbar.tsx";
import PaperCards from "../components/PaperCards.tsx";

export default function ProductCatalog() {
  useEffect(() => {}, []);

  return (
    <>
      <Navbar />
      <PaperCards />
    </>
  );
}
