import {atom} from "jotai";
import {Order} from "../models";

export const OrderAtom = atom<Order[]>([]);