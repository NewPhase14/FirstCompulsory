import { atom } from "jotai";
import { Paper } from "./import.ts";

export const PaperAtom = atom<Paper[]>([]);
export const PaperByPriceAtom = atom<Paper[]>([]);
export const PaperByNameAtom = atom<Paper[]>([]);
