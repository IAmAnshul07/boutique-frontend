import React from "react";
import bannerCenter from "@/asset/banner/bannerCenter.png";
import bannerRight from "@/asset/banner/bannerRight.png";
import bannerLeft from "@/asset/banner/bannerLeft.png";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex justify-center h-96 bg-[#98c7d2] mx-8 rounded-md">
      <div className="flex items-end">
        <Image src={bannerLeft} alt="Left Image" />
      </div>

      <div className="flex flex-col justify-end items-center mt-20">
        <div className="mt-auto flex justify-center items-center">
          <h1 className="text-md text-graydark dark:text-base-200">LATEST STYLES</h1>
        </div>
        <div className="divider divider-neutral w-1/2 ml-10"></div>
        <h1 className="text-graydark dark:text-base-200">Checkout Our Collection</h1>
        <button className="btn btn-active mt-2">Shop</button>
        <div className="mt-auto">
          <Image src={bannerCenter} alt="Center Image" className="object-contain h-24" />
        </div>
      </div>

      <div className="flex items-end">
        <Image src={bannerRight} alt="Right Image" className="" />
      </div>
    </div>
  );
};

export default Banner;
