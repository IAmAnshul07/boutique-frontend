import React, { useState } from "react";

const PickSize = () => {
  const sizesDivision = ["S", "M", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <>
      <h1 className="text-subHeading font-semibold">Select size</h1>
      <div className="flex mt-2">
        {sizesDivision.map((size) => (
          <label key={size} className="mr-4">
            <input type="radio" name="size" value={size} className="hidden" onChange={() => handleSizeChange(size)} />
            <div
              className={`rounded-full p-2 border-2 min-w-12 text-center min-h-12 cursor-pointer ${
                selectedSize === size ? "bg-buttonPrimary text-white" : "border-[#1f29371a] bg-white text-black"
              }`}
            >
              {size}
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default PickSize;
