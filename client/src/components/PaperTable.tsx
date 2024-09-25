import React from "react";
import { useAtom } from "jotai/index";
import { PaperAtom } from "../atoms/PaperAtom.tsx";

export default function PaperTable() {
  const [papers, setPapers] = useAtom(PaperAtom);

  return (
    <div className="grid grid-cols-3 gap-4 m-5">
      {papers.map((paper) => {
        return (
          <div>
            <figure>
              <img src={paper.picture!} alt="Papers" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{paper.name}</h2>
              <p>{paper.name} is fantastic for just about everything</p>
              <h3>${paper.price}</h3>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
