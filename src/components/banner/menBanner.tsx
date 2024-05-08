import React from "react";
import bannerCenter from "@/asset/banner/bannerCenter.png";
import menRightImg from "@/asset/banner/menRightImg.png";
import menLeftImg from "@/asset/banner/menLeftImg.png";
import Image from "next/image";

const MenBanner = () => {
  return (
    <div className="flex justify-center h-96 bg-[#98c7d2] mx-8 rounded-md mt-2">
      <div className="flex items-end w-[20rem] h-[24rem]">
        <Image src={menLeftImg} alt="Left Image" className="w-full h-full" />
      </div>

      <div className="flex flex-col w-[30%] justify-end items-center mt-20">
        <div className="mt-auto flex justify-center items-center">
          <h1 className="text-md text-graydark dark:text-base-200">LATEST MEN'S STYLES</h1>
        </div>
        <div className="divider divider-neutral ml-10"></div>
        <h1 className="text-graydark dark:text-base-200">Checkout Our Collection</h1>
        <button className="btn btn-active mt-2">Shop</button>
        <div className="mt-auto">
          <Image src={bannerCenter} alt="Center Image" className="object-contain h-24" />
        </div>
      </div>

      <div className="flex items-end">
        <Image src={menRightImg} alt="Right Image" className="w-full h-full" />
      </div>
    </div>
  );
};

export default MenBanner;
