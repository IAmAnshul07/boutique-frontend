"use client";
import React from "react";
import Card from "@/components/card";
import { responseData } from "@/lib/women";
import Link from "next/link";

const Women: React.FC<{}> = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {responseData.map((product) => (
          <Link href={`product/${product.id}`} key={product.id}>
            <Card product={product} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Women;
