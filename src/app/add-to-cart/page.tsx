"use client";
import React, { useState } from "react";
import EmptyCart from "@/asset/add-to-cart/emptyCart";

const AddToCart = () => {
  const [isCartEmpty] = useState<boolean>(true);
  return (
    <div className="h-[100vh]">
      {isCartEmpty && (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <EmptyCart />
          <h1 className="text-2xl mt-4 font-thin">Your Fashion bag is empty</h1>
          <p className="text-xl mt-2 font-extralight">Explore our product and find somthing you like</p>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
