// @ts-ignore
import Dunder from "../assets/DunderMifflin-Logo.png";
// @ts-ignore
import Account from "../assets/Account.png";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { OrderEntryAtom } from "../atoms/OrderEntryAtom.tsx";
import { useEffect } from "react";
import { OrderEntry } from "../Api.ts";
import { useInitializeData } from "../hooks/useInitializeData.ts";
import { getTotalCost } from "./getTotalCost.ts";

export default function Navbar() {
  const [orderEntries] = useAtom(OrderEntryAtom);
  const [, setCart] = useAtom(OrderEntryAtom);

  useEffect(() => {
    const entries = localStorage.getItem("orderEntries");
    if (entries) {
      let orderEntries1: OrderEntry[] = JSON.parse(entries) as OrderEntry[];
      setCart(orderEntries1);
    }
  }, []);

  useInitializeData();

  return (
    <div className="navbar shadow-lg bg-gray-100 fixed w-full z-10 p-4">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost">
          <img className="logo" src={Dunder} alt="Dunder" />
        </Link>
      </div>
      <div className="navbar-center">
        <Link
          to="/"
          className="nav-link mx-4 text-gray-800 hover:text-blue-600"
        >
          Home
        </Link>
        <Link
          to="/product"
          className="nav-link mx-4 text-gray-800 hover:text-blue-600"
        >
          Products
        </Link>
      </div>
      <div className="navbar-end flex items-center">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle relative"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item bg-blue-600 text-white">
                {orderEntries.length}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-white z-[1] mt-3 w-52 shadow-lg rounded-lg transition-transform transform duration-300 ease-in-out"
          >
            <div className="card-body p-4">
              <span className="text-lg font-bold text-gray-800">
                {orderEntries.length} Items
              </span>
              <span className="text-gray-600">Subtotal: ${getTotalCost()}</span>
              <div className="card-actions">
                <Link to={"/shoppingcart"}>
                  <button className="btn btn-primary btn-block bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200 ease-in-out">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="User Avatar" src={Account} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-lg z-[1] mt-3 w-52 p-2 shadow-lg transition-all duration-200 ease-in-out"
          >
            <li className="hover:bg-gray-200 transition-colors duration-200 ease-in-out">
              <Link to="/customer" className="justify-between text-gray-800">
                Customers
              </Link>
            </li>
            <li className="hover:bg-gray-200 transition-colors duration-200 ease-in-out">
              <Link to="/order" className="justify-between text-gray-800">
                Order History
              </Link>
            </li>
            <li className="hover:bg-gray-200 transition-colors duration-200 ease-in-out">
              <Link to="/management" className="text-gray-800">
                Product Management
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
