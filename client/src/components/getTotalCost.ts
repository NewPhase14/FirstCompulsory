import { useState } from "react";
import { useAtom } from "jotai";
import { OrderEntryAtom } from "../atoms/OrderEntryAtom.tsx";

export function getTotalCost() {
  const [orderEntries] = useAtom(OrderEntryAtom);
  let totalCost = 0;
  orderEntries.forEach((entry) => {
    // @ts-ignore
    totalCost += entry.quantity * entry.product?.price;
  });
  return totalCost;
}
