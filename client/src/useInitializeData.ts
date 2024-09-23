import { useAtom } from "jotai";
import { CustomerAtom } from "./atoms/CustomerAtom.tsx";
import { useEffect } from "react";
import { http } from "./http.ts";

export function useInitializeData() {
  const [, setCustomers] = useAtom(CustomerAtom);

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
}
