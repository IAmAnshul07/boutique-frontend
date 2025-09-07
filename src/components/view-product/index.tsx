"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { ImageDataType } from "@/types/product";
import { useSessionLens } from "@/hooks/useSessionLens";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const DisplayProductImage: React.FC<{ productData: ImageDataType[] }> = ({ productData }) => {
  const [selectedImage, setSelectedImage] = useState<ImageDataType | null>(productData[0]);
  const { trackEvent } = useSessionLens();
  const { user } = useSelector((state: RootState) => state.userReducer);

  // Track product page start time
  useEffect(() => {
    (window as any).productPageStartTime = Date.now();
    (window as any).productImagesViewed = 0;
    (window as any).productZoomUsed = false;
  }, []);

  const handleImageClick = (image: ImageDataType) => {
    setSelectedImage(image);
    (window as any).productImagesViewed = ((window as any).productImagesViewed || 0) + 1;

    // Track image interaction
    trackEvent("product_image_viewed", {
      product_id: productData[0]?.id || "unknown",
      product_name: productData[0]?.productName || "unknown",
      image_index: image.index,
      image_src: image.src,
      total_images: productData.length,
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      time_on_product_page: Date.now() - (window as any).productPageStartTime || 0,
      images_viewed_count: (window as any).productImagesViewed || 1,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      screen_size: `${screen.width}x${screen.height}`,
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `User viewed image ${image.index + 1} of ${productData.length} for ${productData[0]?.productName || "product"}`
    });
  };

  const handleImageZoom = () => {
    (window as any).productZoomUsed = true;
    
    // Track zoom interaction
    trackEvent("product_image_zoomed", {
      product_id: productData[0]?.id || "unknown",
      product_name: productData[0]?.productName || "unknown",
      image_src: selectedImage?.src,
      image_index: selectedImage?.index || 0,
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      time_on_product_page: Date.now() - (window as any).productPageStartTime || 0,
      images_viewed_count: (window as any).productImagesViewed || 0,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `User zoomed image ${(selectedImage?.index || 0) + 1} for ${productData[0]?.productName || "product"}`
    });
  };

  const handleImageHover = (image: ImageDataType) => {
    trackEvent("hover", {
      target_id: `product_image_${image.index}`,
      duration_ms: 1000, // You can measure actual hover duration
      product_id: productData[0]?.id || "unknown",
      product_name: productData[0]?.productName || "unknown",
      image_index: image.index,
      image_src: image.src,
      user_id: user?.id || "anonymous",
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: new Date().toISOString(),
      event_summary: `User hovered over image ${image.index + 1} for ${productData[0]?.productName || "product"}`
    });
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4 lg:items-start">
      {/* Vertical image gallery for large screens */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:w-1/3 lg:h-full lg:overflow-y-auto lg:overflow-x-hidden lg:space-y-4 lg:pr-4 my-4">
        {productData.map((image: ImageDataType) => (
          <div 
            key={image.index} 
            className="flex justify-center cursor-pointer" 
            onClick={() => handleImageClick(image)}
            onMouseEnter={() => handleImageHover(image)}
          >
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
          <div 
            key={image.index} 
            className="inline-block mx-1 cursor-pointer" 
            onClick={() => handleImageClick(image)}
            onMouseEnter={() => handleImageHover(image)}
          >
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
