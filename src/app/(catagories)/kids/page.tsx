"use client";
import React, { useEffect } from "react";
import Card from "@/components/card";
import { responseData } from "@/lib/women";
import Link from "next/link";
import { useSessionLens } from "@/hooks/useSessionLens";

const Kids: React.FC<{}> = () => {
  const { trackEvent } = useSessionLens();

  // Track category page view
  useEffect(() => {
    trackEvent("category_page_viewed", {
      category: "kids",
      product_count: responseData.length,
      timestamp: Date.now(),
    });
  }, [trackEvent]);

  const handleProductClick = (product: any) => {
    trackEvent("product_clicked", {
      product_id: product.id,
      product_name: product.productName,
      category: "kids",
      price: product.discountPrice,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {responseData.map((product) => (
          <div key={product.id} className="w-full">
            <Link href={`product/${product.id}`} onClick={() => handleProductClick(product)}>
              <Card product={product} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kids;
