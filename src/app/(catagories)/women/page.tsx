"use client";
import React from "react";
import Card from "@/components/card";
import { responseData } from "@/lib/women";
import Banner from "@/components/banner";

const Women: React.FC<{}> = () => {
  return (
    <>
      <Banner />
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
