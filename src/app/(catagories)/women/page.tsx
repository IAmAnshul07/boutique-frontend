"use client";
import React from "react";
import Card from "@/components/card";
import { responseData } from "@/lib/women";
import Link from "next/link";

const Women: React.FC<{}> = () => {
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {responseData.map((product) => (
          <Link href={`product/${product.id}`} key={product.id} className="m-4">
            <Card product={product} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Women;
