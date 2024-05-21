"use client";
import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "@/redux/services/category";
import { useGetColorsQuery } from "@/redux/services/color";

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
  console.log("color data ->", colorsData);

  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

  const updateURLParams = (key: string, values: string[] | string) => {
    const params = new URLSearchParams(searchParams);
    if ((values as string[]).length) {
      params.set(key, (values as string[]).join(","));
    } else {
      params.delete(key);
    }
    setSearchParams(params);
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  const handlePriceChange = (priceValue: string) => {
    const selectedPrices = searchParams.get("prices")?.split(",") || [];
    const newPrices = selectedPrices.includes(priceValue) ? selectedPrices.filter((value) => value !== priceValue) : [...selectedPrices, priceValue];
    updateURLParams("prices", newPrices);
  };

  const handleCategoryChange = (categoryValue: string) => {
    const selectedCategories = searchParams.get("categories")?.split(",") || [];
    const newCategories = selectedCategories.includes(categoryValue)
      ? selectedCategories.filter((value) => value !== categoryValue)
      : [...selectedCategories, categoryValue];
    updateURLParams("categories", newCategories);
  };

  const handleTypeChange = (typeValue: string) => {
    const selectedTypes = searchParams.get("types")?.split(",") || [];
    const newTypes = selectedTypes.includes(typeValue) ? selectedTypes.filter((value) => value !== typeValue) : [...selectedTypes, typeValue];
    updateURLParams("types", newTypes);
  };

  const handleColorChange = (colorValue: string) => {
    const selectedColors = searchParams.get("colors")?.split(",") || [];
    const newColors = selectedColors.includes(colorValue) ? selectedColors.filter((value) => value !== colorValue) : [...selectedColors, colorValue];
    updateURLParams("colors", newColors);
  };

  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  return (
    <>
      <div className="flex flex-col border-r-2 border-[#e8e9ea] mx-8 mt-5">
        <div>
          <h1 className="text-md">FILTERS</h1>
          <div className="divider divider-end w-11/12"></div>
          <h1 className="text-md">TYPE</h1>
          {categoryFilter.map((category, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={index}
                className="checkbox checkbox-sm"
                checked={new URLSearchParams(searchParams).get("types")?.split(",").includes(category) || false}
                onChange={() => handleTypeChange(category)}
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
                value={category.id}
                className="checkbox checkbox-sm"
                checked={new URLSearchParams(searchParams).get("categories")?.split(",").includes(category.name) || false}
                onChange={() => handleCategoryChange(category.name)}
              />
              <span>{category.name}</span>
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
                checked={new URLSearchParams(searchParams).get("prices")?.split(",").includes(amount) || false}
                onChange={() => handlePriceChange(amount)}
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
                  value={color.id}
                  className="checkbox checkbox-sm"
                  checked={new URLSearchParams(searchParams).get("colors")?.split(",").includes(color.name) || false}
                  onChange={() => handleColorChange(color.name)}
                />
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color.hex }}></span>
                <span>{color.name}</span>
              </label>
            ))}
        </div>
      </div>
    </>
  );
};

export default Filter;
