import React, { useEffect } from "react";
import { useInitializeData } from "../useInitializeData.ts";
import CustomerTable from "../components/CustomerTable.tsx";
import Navbar from "../components/Navbar.tsx";

export default function HomePage() {
  useEffect(() => {}, []);

  useInitializeData();

  return (
    <>
      <Navbar />
      <CustomerTable />
    </>
  );
}
