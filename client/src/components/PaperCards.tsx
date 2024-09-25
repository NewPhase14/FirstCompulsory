import React from "react";
import { useAtom } from "jotai/index";
import { PaperAtom } from "../atoms/PaperAtom.tsx";
import { Link } from "react-router-dom";

export default function PaperCards() {
  const [papers, setPapers] = useAtom(PaperAtom);

  return (
    <div className="grid grid-cols-3 gap-4 m-5">
      {papers.map((paper) => {
        return (
          <div>
            <Link key={paper.id} to={`/product/${paper.id}`}>
              <img className="image" src={paper.picture!} alt="Papers" />
            </Link>
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
