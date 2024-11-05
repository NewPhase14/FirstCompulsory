import React, { useEffect } from "react";
import Navbar from "../components/Navbar.tsx";
import PaperCards from "../components/paper/PaperCards.tsx";
import {Toaster} from "react-hot-toast";

export default function ProductCatalog() {
  useEffect(() => {}, []);

  return (
    <>
      <Navbar />
        <Toaster position={"top-right"} />
      <PaperCards />
    </>
  );
}
