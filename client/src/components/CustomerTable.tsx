import React from "react";
import { useAtom } from "jotai/index";
import { CustomerAtom } from "../atoms/CustomerAtom.tsx";

export default function CustomerTable() {
  const [customers, setCustomers] = useAtom(CustomerAtom);

  return (
    <div className="overflow-x-auto">
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
