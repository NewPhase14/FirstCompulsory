import React from "react";
import Navbar from "../components/Navbar.tsx";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <div className="homepage-div flex items-center justify-center relative h-screen">
          <div className="overlay"></div> {/* Add the overlay for background */}
          <div className="text-content z-10">
            {" "}
            {/* Use z-10 to ensure text is above overlay */}
            <h1 className="text-outline-white text-5xl mb-2">
              Welcome to Dunder Mifflin
            </h1>
            <p className="text-lg text-white">Your shop for paper products!</p>
          </div>
        </div>
      </div>
    </>
  );
}
