"use client";

import { useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { ImageDataType } from "@/types/product";
import { useSessionLens } from "@/hooks/useSessionLens";

const DisplayProductImage: React.FC<{ productData: ImageDataType[] }> = ({ productData }) => {
  const [selectedImage, setSelectedImage] = useState<ImageDataType | null>(productData[0]);
  const { trackEvent } = useSessionLens();

  const handleImageClick = (image: ImageDataType) => {
    setSelectedImage(image);

    // Track image interaction
    trackEvent("product_image_viewed", {
      product_id: productData[0]?.id || "unknown",
      image_index: image.index,
      image_src: image.src,
      timestamp: Date.now(),
    });
  };

  const handleImageZoom = () => {
    // Track zoom interaction
    trackEvent("product_image_zoomed", {
      product_id: productData[0]?.id || "unknown",
      image_src: selectedImage?.src,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4 lg:items-start">
      {/* Vertical image gallery for large screens */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:w-1/3 lg:h-full lg:overflow-y-auto lg:overflow-x-hidden lg:space-y-4 lg:pr-4 my-4">
        {productData.map((image: ImageDataType) => (
          <div key={image.index} className="flex justify-center cursor-pointer" onClick={() => handleImageClick(image)}>
            <Image
              width={100}
              height={100}
              src={image.src}
              className="h-[90px] w-[60px] cursor-pointer hover:border-4 border-[#d3d4d7] rounded"
              alt="Product Image"
            />
          </div>
        ))}
      </div>

      {/* Main product image and zoom */}
      <div className="flex flex-col lg:flex-1 lg:items-center mb-4 lg:mb-0 lg:pr-4">
        {selectedImage && (
          <Zoom>
            <Image
              width={600}
              height={598}
              src={selectedImage.src}
              className="w-[600px] h-[598px] object-contain rounded-lg"
              alt="Selected item"
              onClick={handleImageZoom}
            />
          </Zoom>
        )}
      </div>

      {/* Mobile image gallery */}
      <div className="lg:hidden overflow-x-auto whitespace-nowrap px-2 py-1">
        {productData.map((image: ImageDataType) => (
          <div key={image.index} className="inline-block mx-1 cursor-pointer" onClick={() => handleImageClick(image)}>
            <Image
              width={100}
              height={100}
              src={image.src}
              className="h-[90px] w-[60px] cursor-pointer hover:border-4 border-[#d3d4d7] rounded"
              alt="Product Image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayProductImage;
