"use client";
import React, { useState, useEffect } from "react";
import Card from "@/asset/add-address/Card.png";
import returnImage from "@/asset/add-address/returnImage.png";
import truckImage from "@/asset/add-address/truckImage.png";
import Image from "next/image";
import { useSessionLens } from "@/hooks/useSessionLens";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AddAddress: React.FC = () => {
  const { trackEvent } = useSessionLens();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [formStartTime, setFormStartTime] = useState<number>(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    houseNumber: "",
    mobileNumber: "",
    locality: "",
    pincode: "",
    city: "",
    state: "",
    isDefaultAddress: false
  });

  // Track form start when component mounts
  useEffect(() => {
    setFormStartTime(Date.now());
    trackEvent("form_start", {
      form_id: "delivery_address_form",
      step: 1,
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other',
      referrer: document.referrer || "direct",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toISOString(),
      event_summary: "User started delivery address form"
    });
  }, []);

  const handleFieldChange = (fieldName: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    trackEvent("input_change", {
      field: fieldName,
      field_type: typeof value === "boolean" ? "checkbox" : "text",
      length: typeof value === "string" ? value.length : 0,
      masked: fieldName === "mobileNumber" || fieldName === "pincode",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      form_id: "delivery_address_form",
      is_required_field: true,
      input_method: "keyboard",
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: new Date().toISOString(),
      event_summary: `User typed ${typeof value === "string" ? value.length : 0} characters in ${fieldName} field`
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filledFields = Object.values(formData).filter(value => 
      typeof value === "string" ? value.trim() !== "" : value === true
    ).length;
    
    trackEvent("form_submit", {
      form_id: "delivery_address_form",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      error_count: 0, // Calculate based on validation
      fields_filled: filledFields,
      total_fields: Object.keys(formData).length,
      completion_percentage: (filledFields / Object.keys(formData).length) * 100,
      form_duration_sec: Math.floor((Date.now() - formStartTime) / 1000),
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `User submitted delivery address form with ${filledFields} fields filled after ${Math.floor((Date.now() - formStartTime) / 1000)} seconds`
    });
    
    trackEvent("form_complete", {
      form_id: "delivery_address_form",
      success: true,
      completion_time_sec: Math.floor((Date.now() - formStartTime) / 1000),
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      fields_completed: filledFields,
      total_fields: Object.keys(formData).length,
      error_count: 0,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: new Date().toISOString(),
      event_summary: `Delivery address form completed successfully in ${Math.floor((Date.now() - formStartTime) / 1000)} seconds`
    });

    trackEvent("goal_completed", {
      goal_id: "address_form_completed",
      funnel_step: "checkout_address",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      conversion_value: 1,
      conversion_type: "address_completion",
      timestamp: new Date().toISOString(),
      event_summary: `Address completion goal achieved for ${user?.role || "guest"} user`
    });
  };

  return (
    <>
      <div className="mx-4 mb-28 flex flex-wrap justify-between">
        <div className="w-full md:w-2/3 my-2">
          <div className="divider mt-10">
            <h2 className="text-xl my-2 mb-4 flex justify-center items-center">Add Delivery Address</h2>
          </div>
          <form onSubmit={handleFormSubmit}>
            {/* Form Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {/* First Column */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="input input-bordered flex items-center gap-2" style={{ width: "calc(50% - 8px)" }}>
                    <input 
                      type="text" 
                      className="grow" 
                      placeholder="*Full Name" 
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange("fullName", e.target.value)}
                    />
                  </div>
                  <div className="input input-bordered flex items-center gap-2" style={{ width: "calc(50% - 8px + 40px)" }}>
                    <input 
                      type="email" 
                      className="grow" 
                      placeholder="*Email" 
                      value={formData.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="input input-bordered flex items-center gap-2">
                  <input 
                    type="text" 
                    className="grow" 
                    placeholder="*House No, Building, Street" 
                    value={formData.houseNumber}
                    onChange={(e) => handleFieldChange("houseNumber", e.target.value)}
                  />
                </div>
              </div>
              {/* Second Column */}
              <div className="flex flex-col gap-2">
                <div className="input input-bordered flex items-center gap-2">
                  <input 
                    type="tel" 
                    className="grow" 
                    placeholder="*Mobile Number" 
                    value={formData.mobileNumber}
                    onChange={(e) => handleFieldChange("mobileNumber", e.target.value)}
                  />
                </div>
                <div className="input input-bordered flex items-center gap-2">
                  <input 
                    type="text" 
                    className="grow" 
                    placeholder="*Locality" 
                    value={formData.locality}
                    onChange={(e) => handleFieldChange("locality", e.target.value)}
                  />
                </div>
              </div>
              {/* Third Column */}
              <div className="flex flex-col gap-2">
                <div className="input input-bordered flex items-center gap-2">
                  <input 
                    type="text" 
                    className="grow" 
                    placeholder="*PIN code" 
                    value={formData.pincode}
                    onChange={(e) => handleFieldChange("pincode", e.target.value)}
                  />
                </div>
                <div className="input input-bordered flex items-center gap-2">
                  <input 
                    type="text" 
                    className="grow" 
                    placeholder="*City" 
                    value={formData.city}
                    onChange={(e) => handleFieldChange("city", e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    className="checkbox" 
                    id="defaultAddress" 
                    checked={formData.isDefaultAddress}
                    onChange={(e) => handleFieldChange("isDefaultAddress", e.target.checked)}
                  />
                  <label htmlFor="defaultAddress">Set As Default Address</label>
                </div>
              </div>
              {/* Fourth Column */}
              <div className="flex flex-col gap-2">
                <label className="input input-bordered flex items-center gap-2">
                  <input 
                    type="text" 
                    className="grow" 
                    placeholder="*State" 
                    value={formData.state}
                    onChange={(e) => handleFieldChange("state", e.target.value)}
                  />
                </label>
              </div>
            </div>
            {/* End of Form Content */}
            <button type="submit" className="btn btn-primary w-full mt-4">
              Shop Now
            </button>
          </form>
        </div>
        {/* Order Information Div */}
        <div className="w-full md:w-1/4 my-9 mr-9 flex items-center justify-center bg-base-200">
          <div className="flex-grow mx-2" style={{ height: "calc(100% - 4px)" }}>
            <div className="h-full">
              <h1 className="mx-2 text-xl font-semibold">Order Information</h1>
              <div className="flex justify-between mx-2 my-4">
                <h1>Bag Total: </h1>
                <div>Rs 1200</div>
              </div>
              <div className="flex justify-between mx-2 my-4">
                <h1>Shipping Charges: </h1>
                <div>Free</div>
              </div>
              <div className="flex justify-between mx-2 my-4">
                <h1 className="font-semibold">Total: </h1>
                <div className="font-semibold">Rs 1200</div>
              </div>
              <div className="btn btn-primary flex items-center my-4 mx-4">Checkout</div>
              <div className="divider"></div>
              <div className="flex mx-2 my- ">
                <Image src={truckImage} alt="Truck Image" />
                <h1 className="mx-2">Free Shipping for orders above Rs 1200</h1>
              </div>
              <div className="flex mx-2 my-2">
                <Image src={Card} alt="Card Image" />
                <h1 className="mx-2">Secure Payment & Checkout </h1>
              </div>
              <div className="flex mx-2 mb-6">
                <Image src={returnImage} alt="Return Image" />
                <h1 className="mx-2">Easy Return , Free pick up </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
