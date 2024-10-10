import { useAtom } from "jotai";
import { CustomerAtom } from "./atoms/CustomerAtom.tsx";
import { useEffect } from "react";
import { http } from "./http.ts";
import {
  PaperAtom,
  PaperByNameAtom,
  PaperByPriceAtom,
} from "./atoms/PaperAtom.tsx";
import { PropertyAtom } from "./atoms/PropertyAtom.tsx";
import { OrderAtom } from "./atoms/OrderAtom.tsx";

export function useInitializeData() {
  const [, setCustomers] = useAtom(CustomerAtom);
  const [, setPapers] = useAtom(PaperAtom);
  const [, setProperties] = useAtom(PropertyAtom);
  const [, setOrders] = useAtom(OrderAtom);
  const [, setPapersByPrice] = useAtom(PaperByPriceAtom);
  const [, setPapersByName] = useAtom(PaperByNameAtom);

  useEffect(() => {
    http.api
      .customerGetAllCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    http.api
      .paperGetAllPapers()
      .then((response) => {
        setPapers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    http.api
      .propertyGetAllProperties()
      .then((response) => {
        setProperties(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    http.api
      .orderGetAllOrders()
      .then((response) => {
        setOrders(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    http.api
      .paperGetPaperByPrice()
      .then((response) => {
        setPapersByPrice(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    http.api
      .paperGetPaperByName()
      .then((response) => {
        setPapersByName(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
}
