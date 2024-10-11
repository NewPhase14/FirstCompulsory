import { useAtom } from "jotai";
import { OrderEntryAtom } from "../atoms/OrderEntryAtom.tsx";

export function getTotalCost() {
  const [orderEntries] = useAtom(OrderEntryAtom); // Get the order entries
  return orderEntries.reduce((total, entry) => {
    const price = entry.product?.price || 0; // Ensure the price exists
    const quantity = entry.quantity || 0; // Ensure the quantity is set
    return total + price * quantity; // Accumulate total cost
  }, 0);
}
