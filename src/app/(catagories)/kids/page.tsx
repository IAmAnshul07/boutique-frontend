"use client";
import React from "react";
import Card from "@/components/card";
import { responseData } from "@/lib/women";
import Link from "next/link";

const Women: React.FC<{}> = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {responseData.map((product) => (
          <div key={product.id} className="w-full">
            <Link href={`product/${product.id}`}>
              <Card product={product} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Women;
