"use client";
import React from "react";
import Card from "@/components/card";
import Banner from "@/components/banner";
import { responseData } from "@/lib/women";

const Women: React.FC<{}> = () => {
  return (
    <>
      <div>
        <Banner />
      </div>
      <div className="flex flex-row flex-wrap justify-center">
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
