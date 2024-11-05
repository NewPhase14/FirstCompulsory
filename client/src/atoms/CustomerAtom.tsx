import { atom } from "jotai";
import { Customer } from "../models";

export const CustomerAtom = atom<Customer[]>([]);
