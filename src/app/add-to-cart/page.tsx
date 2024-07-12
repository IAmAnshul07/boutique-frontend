"use client";
import React, { useState } from "react";
import EmptyCart from "@/asset/add-to-cart/emptyCart";

const AddToCart = () => {
  const [isCartEmpty] = useState<boolean>(true);
  return (
    <div className="h-screen">
      {isCartEmpty && (
        <div className="flex flex-col justify-center items-center w-full h-full p-4 md:p-8">
          <EmptyCart />
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 font-thin text-center">Your Fashion bag is empty</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-2 font-extralight text-center">Explore our products and find something you like</p>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
