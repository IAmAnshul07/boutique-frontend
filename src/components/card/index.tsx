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
    <div className="card side bg-[#d7e1cf21] rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <figure className="w-full h-40 sm:h-48 md:h-52 lg:h-56">
        <Image src={image[0]} alt={name} width={208} height={208} objectFit="cover" className="w-full h-full" />
      </figure>
      <div className="p-3">
        <div>
          <span className="tooltip" data-tip={name}>
            <p className="font-medium text-sm sm:text-base md:text-lg truncate">{name}</p>
          </span>
        </div>
        <div className="flex items-center">
          <span className="tooltip" data-tip={`${currency} ${price}`}>
            <p className="text-sm sm:text-base md:text-lg truncate">
              {currency} {discountedPrice}
            </p>
          </span>
          <span className="ml-2 tooltip line-through text-xs sm:text-sm md:text-base" data-tip={`${currency} ${price}`}>
            <p className="truncate">
              {currency} {price}
            </p>
          </span>
        </div>
        <Rating value={rating} />
      </div>
    </div>
  );
};

export default Card;
