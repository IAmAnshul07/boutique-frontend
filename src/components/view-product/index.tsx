"use client";

import { ImageDataType } from "@/app/product/[productId]/page";
import { useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const DisplayProductImage: React.FC<{ productData: ImageDataType[] }> = ({ productData }) => {
  const [selectedImage, setSelectedImage] = useState<ImageDataType | null>(productData[0]);

  const handleImageClick = (image: ImageDataType) => {
    setSelectedImage(image);
  };
  return (
    <>
      <div className="flex my-4 justify-center w-40">
        <div className="flex flex-col items-center w-1/2 h-full overflow-hidden">
          <div className="overflow-y-scroll w-full">
            <div className="flex flex-col items-center space-y-4">
              {productData.map((images: ImageDataType) => (
                <div key={images.index} className="flex justify-center w-full" onClick={() => handleImageClick(images)}>
                  <Image
                    width={100}
                    height={100}
                    src={images.src}
                    className="h-[90px] w-[60px] cursor-pointer hover:border-4 border-[#d3d4d7] rounded"
                    alt="Product Image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedImage && (
        <div className="mt-4">
          <Zoom>
            <Image width={600} height={598} src={selectedImage.src} className="w-[600px] h-[598px] object-contain rounded-lg" alt="selected item" />
          </Zoom>
        </div>
      )}
      <div className="flex flex-col lg:flex-row">
        <div className="divider !h-full lg:divider-horizontal"></div>
      </div>
    </>
  );
};

export default DisplayProductImage;
