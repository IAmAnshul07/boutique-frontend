"use client";
import React from "react";
import { useGetCategoriesQuery } from "@/redux/services/category";
import { useGetColorsQuery } from "@/redux/services/color";
import useSearchFilterParam from "@/hooks/useFilterHook";
import { useGetTagsQuery } from "@/redux/services/tag";

interface Color {
  id: number;
  name: string;
  hex: string;
}

const Filter = () => {
  const categoryFilter = ["Women", "Men", "Kids"];
  const price = ["Rs. 59 to Rs. 500", "Rs. 500 to Rs. 1000", "Rs. 1000 to Rs. 2000", "Rs. 2000 to Rs. 5000"];
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: colorsData } = useGetColorsQuery();
  const { data: occasionData } = useGetTagsQuery("");
  const { getParamValues, handleItemChange, clearAllParams } = useSearchFilterParam();

  return (
    <div className="flex flex-col border-r-2 border-[#e8e9ea] mx-8 mt-5">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-md">FILTERS</h1>
          <button className="btn btn-xs mr-4" onClick={clearAllParams}>
            Clear filter
          </button>
        </div>
        <div className="divider divider-end w-11/12"></div>
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
      </div>
      <div className="divider divider-end w-11/12"></div>
      <div>
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
      </div>
      <div className="divider divider-end w-11/12"></div>
      <div>
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
      </div>
      <div className="divider divider-end w-11/12"></div>
      <div>
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
      </div>
      <div className="divider divider-end w-11/12"></div>
      <div>
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
  );
};

export default Filter;
