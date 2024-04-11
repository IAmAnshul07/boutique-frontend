"use client";
import React from "react";
import Card from "@/components/card";
import { responseData } from "@/lib/women";
import Banner from "@/components/banner";
import Filter from "@/components/filter";

const Women: React.FC<{}> = () => {
  return (
    <>
      <Banner />
      <div className="flex ">
        <div className="flex w-[52%] ml-8 my-4 rounded-md">
          <Filter />
        </div>
        <div className="flex flex-row flex-wrap">
          {responseData.map((product) => (
            <div key={product.id} className="m-4">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Women;
