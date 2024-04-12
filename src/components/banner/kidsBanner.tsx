import React from "react";
import kidsLeft from "@/asset/banner/kidsLeft.png";
import KidsCenter from "@/asset/banner/bannerCenter.png";
import KidsRight from "@/asset/banner/kidsright.png";
import Image from "next/image";

const KidsBanner = () => {
  return (
    <div className="flex justify-center h-96 bg-[#98c7d2] mx-8 rounded-md">
      <div className="flex items-end w-[20rem] h-[24rem]">
        <Image src={kidsLeft} alt="Left Image" className="w-full h-full" />
      </div>

      <div className="flex flex-col w-[30%] justify-end items-center mt-20">
        <div className="mt-auto flex justify-center items-center">
          <h1 className="text-md text-graydark dark:text-base-200">LATEST MEN'S STYLES</h1>
        </div>
        <div className="divider divider-neutral ml-10"></div>
        <h1 className="text-graydark dark:text-base-200">Checkout Our Collection</h1>
        <button className="btn btn-active mt-2">Shop</button>
        <div className="mt-auto">
          <Image src={KidsCenter} alt="Center Image" className="object-contain h-24" />
        </div>
      </div>

      <div className="flex items-end">
        <Image src={KidsRight} alt="Right Image" className="w-full h-full" />
      </div>
    </div>
  );
};

export default KidsBanner;
