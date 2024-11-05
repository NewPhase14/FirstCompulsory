import { atom } from "jotai";
import { Customer } from "./import.ts";

export const CustomerAtom = atom<Customer[]>([]);
