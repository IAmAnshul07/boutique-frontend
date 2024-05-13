import React from "react";
import { useGetCategoriesQuery } from "@/redux/services/category";
import { useGetColorsQuery } from "@/redux/services/color";

const Filter = () => {
  const categoryFilter = ["Women", "Men", "Kids"];
  const price = ["Rs. 59 to Rs. 500", "Rs. 500 to Rs. 1000", "Rs. 1000 to Rs. 2000", "Rs. 2000 to Rs. 5000"];
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: colorsData } = useGetColorsQuery();

  return (
    <>
      <div className="flex flex-col border-r-2 border-[#e8e9ea] mx-8 mt-5">
        <div>
          <h1 className="text-md">FILTERS</h1>
          <div className="divider divider-end w-11/12"></div>
          <h1 className="text-md">TYPE</h1>
          {categoryFilter.map((category, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" value={category} className="checkbox checkbox-sm" />
              <span>{category}</span>
            </label>
          ))}
        </div>
        <div className="divider divider-end  w-11/12"></div>
        <div>
          <h1 className="text-md">CATEGORIES</h1>
          {categoriesData?.data?.map((category: any, index: number) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" value={category.id} className="checkbox checkbox-sm" />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
        <div className="divider divider-end w-11/12"></div>
        <div>
          <h1 className="text-md">PRICE</h1>
          {price.map((amount, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" value={amount} className="checkbox checkbox-sm" />
              <span>{amount}</span>
            </label>
          ))}
        </div>
        <div className="divider divider-end w-11/12"></div>
        <div>
          <h1 className="text-md">COLOR</h1>
          {colorsData?.map((color: any, index: number) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" value={color.name} className="checkbox checkbox-sm" />
              <span className=" w-4 h-4 rounded-full" style={{ backgroundColor: color.hex }}></span>
              <span>{color.name}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default Filter;
