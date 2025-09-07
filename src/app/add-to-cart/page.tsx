"use client";
import React, { useState, useEffect } from "react";
import EmptyCart from "@/asset/add-to-cart/emptyCart";
import { useSessionLens } from "@/hooks/useSessionLens";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AddToCart = () => {
  const [isCartEmpty] = useState<boolean>(true);
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

  // Track cart page view
  useEffect(() => {
    trackEvent("page_view", {
      page: "/add-to-cart",
      title: "Shopping Cart",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      cart_item_count: getCartItemCount(),
      cart_total_value: getCartTotalValue(),
      is_cart_empty: isCartEmpty,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      page_views_in_session: (window as any).pageViewsInSession || 1,
      timestamp: new Date().toISOString(),
      event_summary: `User viewed cart page with ${getCartItemCount()} items worth ₹${getCartTotalValue()}`
    });
  }, []);

  const handleCheckout = () => {
    trackEvent("click", {
      target_id: "checkout_button",
      label: "Proceed to Checkout",
      location: "cart_page",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      cart_item_count: getCartItemCount(),
      cart_total_value: getCartTotalValue(),
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `User initiated checkout with ${getCartItemCount()} items worth ₹${getCartTotalValue()}`
    });

    trackEvent("goal_completed", {
      goal_id: "cart_checkout_initiated",
      funnel_step: "checkout",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      conversion_value: getCartTotalValue(),
      conversion_type: "checkout_initiation",
      cart_item_count: getCartItemCount(),
      timestamp: new Date().toISOString(),
      event_summary: `Checkout goal completed for ₹${getCartTotalValue()} order`
    });
  };

  const handleContinueShopping = () => {
    trackEvent("click", {
      target_id: "continue_shopping",
      label: "Continue Shopping",
      location: "cart_page",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `User clicked continue shopping from empty cart`
    });
  };

  return (
    <div className="h-screen">
      {isCartEmpty && (
        <div className="flex flex-col justify-center items-center w-full h-full p-4 md:p-8">
          <EmptyCart />
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 font-thin text-center">Your Fashion bag is empty</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-2 font-extralight text-center">Explore our products and find something you like</p>
          <button 
            onClick={handleContinueShopping}
            className="btn btn-primary mt-4"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
