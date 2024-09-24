import React, { useEffect } from "react";
import { useInitializeData } from "../useInitializeData.ts";
import Navbar from "../components/Navbar.tsx";

export default function ProductPage() {
  useEffect(() => {}, []);

  useInitializeData();

  return (
    <>
      <Navbar />
      <h1>Product Page</h1>
    </>
  );
}
