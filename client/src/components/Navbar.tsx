// @ts-ignore
import Dunder from "../assets/DunderMifflin-Logo.png";
// @ts-ignore
import Account from "../assets/Account.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar shadow bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">
          <img className="logo" src={Dunder} alt="Dunder" />
        </a>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl mx-10">
          Home
        </Link>
        <Link to="/product" className="btn btn-ghost text-xl mx-10">
          Products
        </Link>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs mx-10"
        />
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
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
              <img alt="Tailwind CSS Navbar component" src={Account} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/order" className="justify-between">
                Order History
              </Link>
            </li>
            <li>
              <Link to="/management">Product Management</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
