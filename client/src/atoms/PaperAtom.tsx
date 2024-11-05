import { atom } from "jotai";
import { Paper } from "../models";

export const PaperAtom = atom<Paper[]>([]);
export const PaperByPriceAtom = atom<Paper[]>([]);
export const PaperByNameAtom = atom<Paper[]>([]);
