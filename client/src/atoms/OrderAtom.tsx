import {atom} from "jotai";
import {Order} from "../Api.ts";

export const OrderAtom = atom<Order[]>([]);