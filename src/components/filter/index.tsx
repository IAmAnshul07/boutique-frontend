import React from "react";

const Filter = () => {
  const categoryFilter = ["Women", "Men", "Kids"];
  const categories = ["Sarees", "Kurtas", "Kurta Set", "Jewellery Set", "Lehenga Choli", "Dress Material"];
  const price = ["Rs. 59 to Rs. 500", "Rs. 500 to Rs. 1000", "Rs. 1000 to Rs. 2000", "Rs. 2000 to Rs. 5000"];
  const colorsFilter = [
    { name: "red", hex: "#FF0000" },
    { name: "green", hex: "#00FF00" },
    { name: "blue", hex: "#0000FF" },
    { name: "yellow", hex: "#FFFF00" },
    { name: "orange", hex: "#FFA500" },
    { name: "purple", hex: "#800080" },
    { name: "cyan", hex: "#00FFFF" },
    { name: "magenta", hex: "#FF00FF" },
    { name: "pink", hex: "#FFC0CB" },
    { name: "teal", hex: "#008080" },
    { name: "lime", hex: "#00FF00" },
    { name: "indigo", hex: "#4B0082" },
    { name: "brown", hex: "#A52A2A" },
    { name: "black", hex: "#000000" },
    { name: "white", hex: "#FFFFFF" },
    { name: "gray", hex: "#808080" },
    { name: "silver", hex: "#C0C0C0" },
    { name: "gold", hex: "#FFD700" },
    { name: "maroon", hex: "#800000" },
    { name: "navy", hex: "#000080" },
    { name: "olive", hex: "#808000" },
  ];

  return (
    <>
      <div className="flex flex-col border-r-2 border-[#e8e9ea] dark:border-[#2b3039]">
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
          {categories.map((category, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" value={category} className="checkbox checkbox-sm" />
              <span>{category}</span>
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
          {colorsFilter.map((color, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" value={color.name} className="checkbox checkbox-sm" />
              <span className={`w-4 h-4 rounded-full bg-${color.name}`} style={{ backgroundColor: color.hex }}></span>
              <span>{color.name}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default Filter;
