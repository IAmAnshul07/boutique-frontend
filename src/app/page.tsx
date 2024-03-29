import { Metadata } from "next";
import Image from "next/image";
import rightImage from "../asset/homepage/rightImage.png";
import women from "../asset/homepage/women.png";
import whiteBackground from "../asset/homepage/whiteBackgroound.png";

export const metadata: Metadata = {
  title: "Fashion | Fashion Boutique",
  description: "This is Fashion Boutique Home",
};

export default function Home() {
  return (
    <>
      <div className="top-container relative flex">
        <div className="left-container flex-grow">
          <Image src={whiteBackground.src} width={400} height={400} alt="Right Side Image" className="w-full h-[70%]" />
        </div>
        <div className="w-full middle-container absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
          <h1 className="text-center text-black text-[11rem] font-bold">NEW FASHION</h1>
        </div>
        <div className="middle-container absolute left-1/2 transform -translate-x-1/2 z-30">
          <Image src={women.src} width={400} height={400} alt="Middle Image" />
        </div>

        <div className="right-container flex-grow">
          <Image src={rightImage.src} width={600} height={600} alt="Right Side Image" className="w-full h-[70%]" />
        </div>
      </div>
    </>
  );
}
