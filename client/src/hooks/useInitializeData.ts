import { useAtom } from "jotai";
import { useEffect } from "react";

import { http, PaperAtom, PaperByNameAtom, PaperByPriceAtom, CustomerAtom, PropertyAtom, OrderAtom} from "./imports.ts";

export function useInitializeData() {
    const [, setCustomers] = useAtom(CustomerAtom);
    const [, setPapers] = useAtom(PaperAtom);
    const [, setProperties] = useAtom(PropertyAtom);
    const [, setOrders] = useAtom(OrderAtom);
    const [, setPapersByPrice] = useAtom(PaperByPriceAtom);
    const [, setPapersByName] = useAtom(PaperByNameAtom);

    useEffect(() => {
        // Fetch and set all customers
        http.api.customerGetAllCustomers()
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        // Fetch and set all papers
        http.api.paperGetAllPapers()
            .then((response) => {
                setPapers(response.data);

                // Sort papers by price and name
                const sortedByPrice = [...response.data].sort((a, b) => a.price!- b.price!);
                const sortedByName = [...response.data].sort((a, b) => a.name!.localeCompare(b.name!));

                setPapersByPrice(sortedByPrice);
                setPapersByName(sortedByName);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        // Fetch and set properties
        http.api.propertyGetAllProperties()
            .then((response) => {
                setProperties(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        // Fetch and set all orders
        http.api.orderGetAllOrders()
            .then((response) => {
                setOrders(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
}
