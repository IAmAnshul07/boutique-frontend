import { ImageDataType } from "@/app/product/[productId]/page";
import React from "react";
import Rating from "../rating";
import Link from "next/link";

const DetailedProductDescription: React.FC<{ product: ImageDataType }> = ({ product }) => {
  const sizesDivision = ["S", "M", "XL", "XXL"];
  return (
    <>
      <div className="flex flex-col my-4 w-full">
        <h1 className="h-min text-xl">{product.productName}</h1>
        <div className="flex mt-2">
          <p>Rs. {product.discountPrice}</p>
          <p className="line-through text-bodydark ml-2 text-md">MRP. {product.actualPrice}</p>
          <p className="text-lightOrange ml-2 text-md">({product.discountPercentage}% off)</p>
        </div>
        <p className="text-xs">inclusive of all taxes</p>
        <div className="divider divider-default w-9/12"></div>
        <h1 className="text-md font-semibold">SELECT SIZE</h1>
        <div className="flex mt-2">
          {sizesDivision.map((size) => (
            <button className="rounded-full mr-4 p-1 border-2 min-w-12 text-center min-h-12" key={size}>
              {size}
            </button>
          ))}
        </div>
        <button className="btn bg-buttonPrimary w-fit mt-4 text-white hover:bg-buttonPrimary">Add to cart</button>
        <div className="divider divider-default w-9/12"></div>
        <h1 className="font-semibold">DELIVERY OPTIONS</h1>
        <label className="input input-bordered flex items-center gap-2 w-48 input-xs mt-2">
          <input type="text" className="grow" placeholder="Pin code" />
          <button>check</button>
        </label>
        <p className="text-xs mt-1">Please enter PIN code to check delivery time and date</p>
        <p className="text-sm mt-2">100% Original Product </p>
        <h1 className="font-semibold mt-4 mb-4">PRODUCT DETAILS</h1>
        <ul className="list-disc ml-4">
          <li>Square cuffs, patch pocket </li>
          <li>Package contains: 1 jump shuit </li>
          <li>Machine wash cold </li>
          <li>pure cotton </li>
        </ul>
        <div className="divider divider-default w-9/12"></div>
        <h1 className="font-semibold">Review</h1>
        <p className="mt-2">BE THE FIRST TO REVIEW THIS PRODUCT </p>
        <div className="flex">
          <p className="mr-2">Your rating:</p>
          <Rating value={product.rating} />
        </div>

        <Link href="#" className="text-lightOrange">
          Write a review
        </Link>
      </div>
    </>
  );
};

export default DetailedProductDescription;
