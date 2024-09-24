import React from "react";
import { useAtom } from "jotai/index";
import { PaperAtom } from "../atoms/PaperAtom.tsx";

export default function PaperTable() {
  const [papers, setPapers] = useAtom(PaperAtom);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Paper Name</th>
            <th>Paper Discontinued?</th>
            <th>Paper Stock</th>
            <th>Paper Price</th>
          </tr>
        </thead>
        <tbody>
          {papers?.map((paper) => {
            return (
              <tr key={paper.id}>
                <td>{paper.id}</td>
                <td>{paper.name}</td>
                <td>{paper.discontinued}</td>
                <td>{paper.stock}</td>
                <td>{paper.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
