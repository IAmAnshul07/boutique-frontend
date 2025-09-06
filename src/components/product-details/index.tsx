"use client";

import Rating from "../rating";
import WriteReview from "../review";
import CheckPincode from "../checkPincode";
import PickSize from "../select-size";
import { ImageDataType } from "@/types/product";
import { useSessionLens } from "@/hooks/useSessionLens";

const DetailedProductDescription: React.FC<{ product: ImageDataType }> = ({ product }) => {
  const { trackEvent } = useSessionLens();

  const handleAddToCart = () => {
    trackEvent("add_to_cart", {
      product_id: product.id || "unknown",
      product_name: product.productName,
      price: product.discountPrice,
      original_price: product.actualPrice,
      discount_percentage: product.discountPercentage,
      timestamp: Date.now(),
    });
  };

  const handleBuyNow = () => {
    trackEvent("buy_now", {
      product_id: product.id || "unknown",
      product_name: product.productName,
      price: product.discountPrice,
      original_price: product.actualPrice,
      discount_percentage: product.discountPercentage,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="flex flex-col my-4 p-4 lg:p-0">
      <h1 className="text-heading text-2xl font-semibold">{product.productName}</h1>
      <div className="flex mt-2">
        <p className="text-xl font-bold">Rs. {product.discountPrice}</p>
        <p className="line-through text-bodydark ml-2 text-md">MRP. {product.actualPrice}</p>
        <p className="text-lightOrange ml-2 text-md">({product.discountPercentage}% off)</p>
      </div>
      <p className="text-xs mt-1">inclusive of all taxes</p>
      <div className="divider divider-default w-auto my-4"></div>
      <PickSize />

      {/* Desktop view buttons */}
      <div className="hidden lg:flex lg:flex-row lg:gap-4 lg:mt-4">
        <button className="btn bg-buttonPrimary w-fit text-white hover:bg-buttonPrimary" onClick={handleAddToCart}>
          Add to cart
        </button>
        <button className="btn bg-buttonPrimary w-fit text-white hover:bg-buttonPrimary" onClick={handleBuyNow}>
          Buy now
        </button>
      </div>

      {/* Content for mobile screens only */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50 flex">
        <button
          className="btn bg-buttonPrimary w-1/2 text-white hover:bg-buttonPrimary rounded-none rounded-l-lg border-r border-gray-200"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        <button className="btn bg-buttonPrimary w-1/2 text-white hover:bg-buttonPrimary rounded-none rounded-r-lg" onClick={handleBuyNow}>
          Buy now
        </button>
      </div>

      <div className="divider divider-default w-auto my-4 lg:my-4"></div>
      <CheckPincode />
      <p className="text-sm mt-2">100% Original Product </p>
      <h1 className="font-semibold mt-4 mb-4 text-subHeading text-xl">Product Details</h1>
      <ul className="list-disc ml-4">
        <li>Square cuffs, patch pocket </li>
        <li>Package contains: 1 jumpsuit </li>
        <li>Machine wash cold </li>
        <li>Pure cotton </li>
      </ul>
      <div className="divider divider-default w-auto my-4"></div>
      <h1 className="font-semibold text-subHeading text-xl">Review</h1>
      <p className="mt-2">BE THE FIRST TO REVIEW THIS PRODUCT</p>
      <div className="flex items-center mt-2">
        <p className="mr-2">Your rating:</p>
        <Rating value={product.rating} />
      </div>
      <WriteReview />
    </div>
  );
};

export default DetailedProductDescription;
