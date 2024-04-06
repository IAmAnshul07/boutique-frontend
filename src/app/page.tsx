import { Metadata } from "next";
import Image from "next/image";
import rightImage from "../asset/homepage/rightImage.png";
import women from "../asset/homepage/women.png";
import BottomImage from "../asset/homepage/bottom image.png";
import CarouselComp from "@/components/carousal";
export const metadata: Metadata = {
  title: "Fashion | Fashion Boutique",
  description: "This is Fashion Boutique Home",
};

export default function Home() {
  return (
    <>
      <div className="flex flex-row items-center justify-center h-125 relative">
        <div className="box1 flex w-full h-125 absolute">
          <div className="bg-white h-full w-1/2"></div>
          <div className="h-full w-1/2 relative">
            <Image src={rightImage.src} fill={true} alt="Right Side Image" className="w-full h-[70%] object-cover" />
          </div>
        </div>
        <div className="box2 z-10 absolute">
          <h1 className="text-center text-base-200 text-8xl lg:text-9xl xl:text-10xl font-bold">NEW FASHION</h1>
        </div>
        <div className="box3 z-20">
          <Image src={women.src} height={350} width={350} alt="Middle Image" className="" />
        </div>
      </div>
      <div className="bottomImage">
        <Image src={BottomImage} alt="Bottom Discount Image" />
      </div>
      <div className="flex justify-center">
        <CarouselComp />
      </div>
    </>
  );
}
