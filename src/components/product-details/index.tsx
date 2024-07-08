"use client";
import Rating from "../rating";
import WriteReview from "../review";
import CheckPincode from "../checkPincode";
import PickSize from "../select-size";
import { ImageDataType } from "@/types/product";

const DetailedProductDescription: React.FC<{ product: ImageDataType }> = ({ product }) => {
  return (
    <>
      <div className="flex flex-col my-4">
        <h1 className="h-min text-heading">{product.productName}</h1>
        <div className="flex mt-2">
          <p>Rs. {product.discountPrice}</p>
          <p className="line-through text-bodydark ml-2 text-md">MRP. {product.actualPrice}</p>
          <p className="text-lightOrange ml-2 text-md">({product.discountPercentage}% off)</p>
        </div>
        <p className="text-xs">inclusive of all taxes</p>
        <div className="divider divider-default w-auto"></div>
        <PickSize />
        <div className="flex flex-row gap-4">
          <button className="btn bg-buttonPrimary w-fit mt-4 text-white hover:bg-buttonPrimary">Add to cart</button>
          <button className="btn bg-buttonPrimary w-fit mt-4 text-white hover:bg-buttonPrimary">Buy now</button>
        </div>

        <div className="divider divider-default w-auto"></div>
        <CheckPincode />
        <p className="text-sm mt-2">100% Original Product </p>
        <h1 className="font-semibold mt-4 mb-4 text-subHeading">Product details</h1>
        <ul className="list-disc ml-4">
          <li>Square cuffs, patch pocket </li>
          <li>Package contains: 1 jump shuit </li>
          <li>Machine wash cold </li>
          <li>pure cotton </li>
        </ul>
        <div className="divider divider-default w-auto"></div>
        <h1 className="font-semibold text-subHeading">Review</h1>
        <p className="mt-2">BE THE FIRST TO REVIEW THIS PRODUCT </p>
        <div className="flex">
          <p className="mr-2">Your rating:</p>
          <Rating value={product.rating} />
        </div>
        <WriteReview />
      </div>
    </>
  );
};

export default DetailedProductDescription;
