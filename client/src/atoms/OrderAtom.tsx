import {atom} from "jotai";
import {Order} from "./import.ts";

export const OrderAtom = atom<Order[]>([]);