import Navbar from "../components/Navbar.tsx";
import ShoppingCartPage from "../components/shoppingCart/ShoppingCartPage.tsx";
import {Toaster} from "react-hot-toast";

export default function ShoppingCart() {
  return (
      <>
        <Navbar />
        <Toaster position={"top-right"} />
        <ShoppingCartPage />
      </>
  );
}
