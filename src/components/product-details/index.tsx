"use client";
import { ImageDataType } from "@/app/product/[productId]/page";
import React, { useEffect, useState } from "react";
import Rating from "../rating";
import { useGetPostOfficeByPinQuery } from "@/redux/services/checkPincode";

const DetailedProductDescription: React.FC<{ product: ImageDataType }> = ({ product }) => {
  const sizesDivision = ["S", "M", "XL", "XXL"];
  const [pinCode, setPinCode] = useState("");
  const [queryPinCode, setQueryPinCode] = useState("");
  const [postOfficeDetails, setPostOfficeDetails] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isReviewText, setIsReviewText] = useState<boolean>(false);

  const { data } = useGetPostOfficeByPinQuery(queryPinCode, {
    skip: !queryPinCode,
  });

  useEffect(() => {
    if (data && data[0].Status === "Success") {
      setPostOfficeDetails(data[0].PostOffice);
      setError("");
    } else if (data && data[0].Status !== "Success") {
      setPostOfficeDetails([]);
      setError("Invalid PIN code");
    }
  }, [data]);

  const handlePinCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinCode(e.target.value);
  };

  const handleCheckPinCode = () => {
    setQueryPinCode(pinCode);
  };

  const handleReviewTextField = () => {
    setIsReviewText((prev) => !prev);
  };

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
            <button className="rounded-full mr-4 p-1 border-2 border-[#1f29371a] min-w-12 text-center min-h-12" key={size}>
              {size}
            </button>
          ))}
        </div>
        <button className="btn bg-buttonPrimary w-fit mt-4 text-white hover:bg-buttonPrimary">Add to cart</button>
        <div className="divider divider-default w-9/12"></div>
        <h1 className="font-semibold">DELIVERY OPTIONS</h1>
        <div>
          <label className="input input-bordered flex items-center gap-2 w-48 input-xs mt-2">
            <input type="text" className="grow" placeholder="Please enter PIN code" value={pinCode} onChange={handlePinCodeChange} />
            <button onClick={handleCheckPinCode}>Check</button>
          </label>
          {postOfficeDetails.length > 0 && (
            <div className="font-light">
              <h2 className="mt-2">Deliver to:</h2>
              <div className="flex flex-wrap">
                {postOfficeDetails.map((postOffice: any, index: number) => (
                  <label key={index} className="flex flex-row text-sm">
                    <input type="radio" name="postOffice" className="ml-4" />
                    <p className="ml-1">{postOffice.Name}</p>
                  </label>
                ))}
              </div>
            </div>
          )}
          {error && <div className="error">{error}</div>}
        </div>
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

        <button className="text-lightOrange w-fit my-2" onClick={handleReviewTextField}>
          Write a review
        </button>
        {isReviewText && (
          <div className="flex items-center">
            <textarea placeholder="Write your review here" className="textarea textarea-bordered textarea-xs w-full max-w-xs"></textarea>
            <button className="btn btn-xs ml-2 bg-buttonPrimary hover:bg-buttonPrimary text-white">Submit Review</button>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailedProductDescription;
