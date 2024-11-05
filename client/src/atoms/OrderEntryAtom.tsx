import { atom } from "jotai";
import { OrderEntry } from "./import.ts";

export const OrderEntryAtom = atom<OrderEntry[]>([]);
