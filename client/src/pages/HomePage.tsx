import React, { useEffect } from "react";

import Navbar from "../components/Navbar.tsx";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="homepage-div flex items-center justify-center h-screen">
        <div className="text-center text-gray-800 text-5xl text-outline-white">
          Welcome to Dunder Mifflin, we got your paper!
        </div>
      </div>
    </>
  );
}
