import Image from "next/image";
import React from "react";
import Rating from "../rating";
import { ProductDetails } from "@/types/product";

interface CardProps {
  product: ProductDetails;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const { name, price, currency, image, rating, discount } = product;
  const discountedPrice = Math.ceil(price - price * (discount / 100));

  return (
    <div className="card shadow-lg side bg-base-200 w-52">
      <figure className="w-52 h-70">
        <Image src={image[0]} alt={name} width={208} height={280} objectFit="cover" />
      </figure>
      <div className="p-3">
        <div>
          <span className="tooltip" data-tip={name}>
            <p className="font-medium truncate">{name}</p>
          </span>
        </div>
        <span className="tooltip" data-tip={`${currency} ${price}`}>
          <p className="truncate">
            {currency} {discountedPrice}
          </p>
        </span>
        <span className="ml-2 tooltip line-through" data-tip={`${currency} ${price}`}>
          <p className="truncate">
            {currency} {price}
          </p>
        </span>
        <Rating value={rating} />
      </div>
    </div>
  );
};

export default Card;
