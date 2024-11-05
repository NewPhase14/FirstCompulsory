import { atom } from "jotai";
import { OrderEntry } from "../models";

export const OrderEntryAtom = atom<OrderEntry[]>([]);
