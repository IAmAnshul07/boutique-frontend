"use client";
import React, { useState, useEffect } from "react";
import { useGetCategoriesQuery } from "@/redux/services/category";
import { useGetColorsQuery } from "@/redux/services/color";
import useSearchFilterParam from "@/hooks/useSearchFilterParam";
import { useGetOccasionsQuery } from "@/redux/services/occasion";

interface Color {
  id: number;
  name: string;
  hex: string;
}

const Filter = () => {
  const [showFilters, setShowFilters] = useState(false);
  const categoryFilter = ["Women", "Men", "Kids"];
  const price = ["Rs. 59 to Rs. 500", "Rs. 500 to Rs. 1000", "Rs. 1000 to Rs. 2000", "Rs. 2000 to Rs. 5000"];
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: colorsData } = useGetColorsQuery();
  const { data: occasionData } = useGetOccasionsQuery();
  const { getParamValues, handleItemChange, clearAllParams } = useSearchFilterParam();

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    // Manage scroll on the body when the modal is open
    document.body.style.overflow = showFilters ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Reset overflow on component unmount
    };
  }, [showFilters]);

  return (
    <div className="relative flex flex-col md:border-r-2 !mr-0 md:border-[#e8e9ea] mx-4 sm:mx-8 mt-5">
      {/* Mobile view filter button */}
      <div className="md:hidden fixed bottom-0 left-0 w-screen bg-white shadow-md p-2 z-[150]">
        <button className="btn btn-primary w-full" onClick={toggleFilters}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter content */}
      <div
        className={`fixed inset-0 z-50 bg-white overflow-y-auto p-4 md:static md:overflow-visible md:p-0 ${showFilters ? "block" : "hidden md:block"}`}
        style={{ height: showFilters ? "calc(100vh - 3.5rem)" : "auto" }}
      >
        <div className="flex flex-col h-full p-4 md:p-0">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-md">FILTERS</h1>
            <button className="btn btn-xs mx-2" onClick={clearAllParams}>
              Clear Filter
            </button>
            <button className="btn btn-xs md:hidden" onClick={toggleFilters}>
              Close
            </button>
          </div>
          <div className="divider"></div>
          <h1 className="text-md">TYPE</h1>
          {categoryFilter.map((category, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={category}
                className="checkbox checkbox-sm"
                checked={getParamValues("types").includes(category)}
                onChange={() => handleItemChange("types", category)}
              />
              <span>{category}</span>
            </label>
          ))}
          <div className="divider my-4"></div> {/* Added margin for spacing */}
          <h1 className="text-md">CATEGORIES</h1>
          {categoriesData?.data?.map((category: { id: string; name: string }) => (
            <label key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={category.name}
                className="checkbox checkbox-sm"
                checked={getParamValues("categories").includes(category.name)}
                onChange={() => handleItemChange("categories", category.name)}
              />
              <span>{category.name}</span>
            </label>
          ))}
          <div className="divider my-4"></div> {/* Added margin for spacing */}
          <h1 className="text-md">OCCASIONS</h1>
          {occasionData?.data?.map((occasion: { id: string; name: string }) => (
            <label key={occasion.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={occasion.name}
                className="checkbox checkbox-sm"
                checked={getParamValues("occasions").includes(occasion.name)}
                onChange={() => handleItemChange("occasions", occasion.name)}
              />
              <span>{occasion.name}</span>
            </label>
          ))}
          <div className="divider my-4"></div> {/* Added margin for spacing */}
          <h1 className="text-md">PRICE</h1>
          {price.map((amount, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={amount}
                className="checkbox checkbox-sm"
                checked={getParamValues("prices").includes(amount)}
                onChange={() => handleItemChange("prices", amount)}
              />
              <span>{amount}</span>
            </label>
          ))}
          <div className="divider my-4"></div> {/* Added margin for spacing */}
          <h1 className="text-md">COLOR</h1>
          {colorsData &&
            colorsData?.result?.map((color: Color) => (
              <label key={color.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={color.name}
                  className="checkbox checkbox-sm"
                  checked={getParamValues("colors").includes(color.name)}
                  onChange={() => handleItemChange("colors", color.name)}
                />
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color.hex }}></span>
                <span>{color.name}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
