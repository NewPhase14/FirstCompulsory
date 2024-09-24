import { useAtom } from "jotai";
import { CustomerAtom } from "./atoms/CustomerAtom.tsx";
import { useEffect } from "react";
import { http } from "./http.ts";
import { PaperAtom } from "./atoms/PaperAtom.tsx";

export function useInitializeData() {
  const [, setCustomers] = useAtom(CustomerAtom);
  const [, setPapers] = useAtom(PaperAtom);

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
}
