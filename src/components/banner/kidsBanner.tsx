import React from "react";
import kidsLeft from "@/asset/banner/kidsLeft.png";
import KidsCenter from "@/asset/banner/bannerCenter.png";
import KidsRight from "@/asset/banner/kidsright.png";
import Image from "next/image";

const KidsBanner = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-auto md:h-[25rem] bg-[#98c7d2] mx-2 md:mx-5 rounded-md mt-2">
      {/* Left Image */}
      <div className="flex items-center justify-center md:items-end w-full md:w-[20%] h-[25%] md:h-full">
        <Image src={kidsLeft} alt="Image" className="w-full h-full object-contain" />
      </div>

      {/* Center Content */}
      <div className="flex flex-col justify-center items-center text-center p-4 md:mt-0 w-full md:w-[30%]">
        <h1 className="text-lg md:text-md text-graydark dark:text-base-200">LATEST KIDS' STYLES</h1>
        <div className="divider divider-neutral mx-4 md:mx-6"></div>
        <h2 className="text-lg md:text-md text-graydark dark:text-base-200">Checkout Our Collection</h2>
        <button className="btn btn-active mt-2 px-4 py-2">Shop</button>
        <div className="mt-4">
          <Image src={KidsCenter} alt="Image" className="object-contain h-24 md:h-24" />
        </div>
      </div>

      {/* Right Image */}
      <div className="flex items-center justify-center md:items-end w-full md:w-[20%] h-[25%] md:h-full">
        <Image src={KidsRight} alt="Image" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default KidsBanner;
