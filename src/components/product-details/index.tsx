"use client";

import Rating from "../rating";
import WriteReview from "../review";
import CheckPincode from "../checkPincode";
import PickSize from "../select-size";
import { ImageDataType } from "@/types/product";
import { useSessionLens } from "@/hooks/useSessionLens";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const DetailedProductDescription: React.FC<{ product: ImageDataType }> = ({ product }) => {
  const { trackEvent } = useSessionLens();
  const { user } = useSelector((state: RootState) => state.userReducer);

  // Helper functions
  const getCartItemCount = () => {
    // Implement based on your cart state management
    return 0;
  };

  const getCartTotalValue = () => {
    // Implement based on your cart state management
    return 0;
  };

  const handleAddToCart = () => {
    trackEvent("add_to_cart", {
      product_id: product.id || "unknown",
      product_name: product.productName,
      product_category: product.category || "unknown",
      product_brand: product.brand || "unknown",
      product_sku: product.sku || "unknown",
      price: product.discountPrice,
      original_price: product.actualPrice,
      discount_percentage: product.discountPercentage,
      currency: "INR",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      cart_item_count: getCartItemCount(),
      cart_total_value: getCartTotalValue(),
      time_on_product_page: Date.now() - (window as any).productPageStartTime || 0,
      product_images_viewed: (window as any).productImagesViewed || 0,
      product_zoom_used: (window as any).productZoomUsed || false,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      screen_size: `${screen.width}x${screen.height}`,
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      page_views_in_session: (window as any).pageViewsInSession || 1,
      referrer: document.referrer || "direct",
      utm_source: new URLSearchParams(window.location.search).get('utm_source'),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      timestamp: new Date().toISOString(),
      event_summary: `User added ${product.productName} (₹${product.discountPrice}) to cart after viewing ${(window as any).productImagesViewed || 0} images`
    });

    trackEvent("conversion", {
      amount: product.discountPrice,
      currency: "INR",
      product_id: product.id,
      user_id: user?.id || "anonymous",
      conversion_type: "add_to_cart",
      timestamp: new Date().toISOString(),
      event_summary: `Conversion: ₹${product.discountPrice} product added to cart`
    });
  };

  const handleBuyNow = () => {
    trackEvent("buy_now", {
      product_id: product.id || "unknown",
      product_name: product.productName,
      product_category: product.category || "unknown",
      product_brand: product.brand || "unknown",
      price: product.discountPrice,
      original_price: product.actualPrice,
      discount_percentage: product.discountPercentage,
      currency: "INR",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      time_on_product_page: Date.now() - (window as any).productPageStartTime || 0,
      product_images_viewed: (window as any).productImagesViewed || 0,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `User clicked buy now for ${product.productName} (₹${product.discountPrice}) after ${Math.floor((Date.now() - (window as any).productPageStartTime || 0) / 1000)} seconds`
    });

    trackEvent("goal_completed", {
      goal_id: "buy_now_clicked",
      funnel_step: "purchase_intent",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      conversion_value: product.discountPrice,
      conversion_type: "purchase_intent",
      timestamp: new Date().toISOString(),
      event_summary: `Buy now goal completed for ₹${product.discountPrice} product`
    });
  };

  const handleSizeSelection = (size: string) => {
    trackEvent("dropdown_select", {
      field: "product_size",
      value: size,
      product_id: product.id,
      product_name: product.productName,
      user_id: user?.id || "anonymous",
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: new Date().toISOString(),
      event_summary: `User selected size ${size} for ${product.productName}`
    });
  };

  const handleQuantityChange = (quantity: number) => {
    trackEvent("input_change", {
      field: "quantity",
      length: quantity.toString().length,
      value: quantity,
      product_id: product.id,
      product_name: product.productName,
      user_id: user?.id || "anonymous",
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: new Date().toISOString(),
      event_summary: `User changed quantity to ${quantity} for ${product.productName}`
    });
  };

  const handleAddToWishlist = () => {
    trackEvent("click", {
      target_id: "add_to_wishlist",
      label: "Add to Wishlist",
      location: "product_details",
      product_id: product.id,
      product_name: product.productName,
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: new Date().toISOString(),
      event_summary: `User added ${product.productName} to wishlist`
    });
  };

  const handleShare = (platform: string) => {
    trackEvent("social_share", {
      platform: platform,
      content_type: "product",
      content_id: product.id,
      product_name: product.productName,
      user_id: user?.id || "anonymous",
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: new Date().toISOString(),
      event_summary: `User shared ${product.productName} on ${platform}`
    });
  };

  return (
    <div className="flex flex-col my-4 p-4 lg:p-0">
      <h1 className="text-heading text-2xl font-semibold">{product.productName}</h1>
      <div className="flex mt-2">
        <p className="text-xl font-bold">Rs. {product.discountPrice}</p>
        <p className="line-through text-bodydark ml-2 text-md">MRP. {product.actualPrice}</p>
        <p className="text-lightOrange ml-2 text-md">({product.discountPercentage}% off)</p>
      </div>
      <p className="text-xs mt-1">inclusive of all taxes</p>
      <div className="divider divider-default w-auto my-4"></div>
      <PickSize />

      {/* Desktop view buttons */}
      <div className="hidden lg:flex lg:flex-row lg:gap-4 lg:mt-4">
        <button className="btn bg-buttonPrimary w-fit text-white hover:bg-buttonPrimary" onClick={handleAddToCart}>
          Add to cart
        </button>
        <button className="btn bg-buttonPrimary w-fit text-white hover:bg-buttonPrimary" onClick={handleBuyNow}>
          Buy now
        </button>
      </div>

      {/* Content for mobile screens only */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50 flex">
        <button
          className="btn bg-buttonPrimary w-1/2 text-white hover:bg-buttonPrimary rounded-none rounded-l-lg border-r border-gray-200"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        <button className="btn bg-buttonPrimary w-1/2 text-white hover:bg-buttonPrimary rounded-none rounded-r-lg" onClick={handleBuyNow}>
          Buy now
        </button>
      </div>

      <div className="divider divider-default w-auto my-4 lg:my-4"></div>
      <CheckPincode />
      <p className="text-sm mt-2">100% Original Product </p>
      <h1 className="font-semibold mt-4 mb-4 text-subHeading text-xl">Product Details</h1>
      <ul className="list-disc ml-4">
        <li>Square cuffs, patch pocket </li>
        <li>Package contains: 1 jumpsuit </li>
        <li>Machine wash cold </li>
        <li>Pure cotton </li>
      </ul>
      <div className="divider divider-default w-auto my-4"></div>
      <h1 className="font-semibold text-subHeading text-xl">Review</h1>
      <p className="mt-2">BE THE FIRST TO REVIEW THIS PRODUCT</p>
      <div className="flex items-center mt-2">
        <p className="mr-2">Your rating:</p>
        <Rating value={product.rating} />
      </div>
      <WriteReview />
    </div>
  );
};

export default DetailedProductDescription;
