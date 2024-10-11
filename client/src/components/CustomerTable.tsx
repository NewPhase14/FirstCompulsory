import React from "react";
import { useAtom } from "jotai/index";
import { CustomerAtom } from "../atoms/CustomerAtom.tsx";

export default function CustomerTable() {
  const [customers] = useAtom(CustomerAtom);

  return (
    <div className="overflow-x-auto pt-32">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Customer Email</th>
            <th>Customer Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => {
            return (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
