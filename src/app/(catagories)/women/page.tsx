"use client";
import React from "react";
import Card from "@/components/card";
import { responseData } from "@/lib/women";

const Women: React.FC<{}> = () => {
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {responseData.map((product) => (
          <div key={product.id} className="m-4">
            <Card product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Women;
