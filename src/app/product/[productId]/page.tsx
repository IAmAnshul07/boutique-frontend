"use client";
import { responseData } from "@/lib/women";
import Image from "next/image";

export default function Products({ params }: { params: { productId: string } }) {
  // Filter product data based on productId
  const product = responseData.find((item) => item.id === parseInt(params.productId));

  // Render product images
  return (
    <>
      <div className="image">
        {product && (
          <div key={product.id}>
            {/* Render the first three images */}
            {product.image.slice(0, 3).map((imageUrl, index) => (
              <Image key={index} src={imageUrl} alt={`Product Image ${index}`} width={200} height={300} />
            ))}
          </div>
        )}
      </div>
      <div className="mainImage"></div>
      <div className="details"></div>
      <div></div>
    </>
  );
}
