"use client";
import React, { useEffect, useState } from "react";
import MultiSelectDropdown, { Option } from "@/components/multiple-select-dropdown";
import { useGetColorsQuery } from "@/redux/services/color";
import { useGetCategoriesQuery } from "@/redux/services/category";
import { useGetTagsQuery } from "@/redux/services/tag";
import ImageUploader from "@/components/add-image";
import DragAndDrop from "@/components/dragAndDrop";
import { IoIosInformationCircleOutline } from "react-icons/io";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Image {
  id: string;
  src: string;
}

interface Occasion {
  value: string;
  label: string;
}

const AddProduct: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [occasionoptions, setOccasionOptions] = useState<Option[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [mrp, setMrp] = useState("");
  const [discount, setDiscount] = useState("");
  const [effectivePrice, setEffectivePrice] = useState("");

  const handleChange = (selected: any) => {
    setSelectedOptions(selected);
  };

  const handleOccasionsChange = (selected: any) => {
    setOccasionOptions(selected);
  };

  const handleImagesUploaded = (newImages: Image[]) => {
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const { data } = useGetColorsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: occasion } = useGetTagsQuery("");

  const options: Option[] =
    data?.result?.map((color: any) => ({
      value: color.name,
      label: color.name,
      hex: color.hex,
    })) || [];

  const occasions: Occasion[] =
    occasion?.data?.map((occasionValue: any) => ({
      value: occasionValue.name,
      label: occasionValue.name,
    })) || [];

  const sizes = ["XS • extra small", "S • small", "M • medium", "L • large", "XL • extra large"];

  useEffect(() => {
    const mrpValue = parseFloat(mrp);
    const discountValue = parseFloat(discount);
    if (!isNaN(mrpValue) && !isNaN(discountValue)) {
      const calculatedEffectivePrice = mrpValue - (mrpValue * discountValue) / 100;
      setEffectivePrice(calculatedEffectivePrice.toFixed(2));
    } else {
      setEffectivePrice("");
    }
  }, [mrp, discount]);

  const formatOptionLabel = (option: Option) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className="rounded-full" style={{ backgroundColor: option.hex, width: 20, height: 20, marginRight: 10 }}></div>
      <span>{option.label}</span>
    </div>
  );

  return (
    <div className="container mt-5 mb-10 flex flex-col flex-grow">
      <div className="mb-4 flex items-center h-15">
        <h1 className="text-md text-4xl font-semibold">Add Product</h1>
      </div>
      <div className="flex flex-col w-full">
        <div className="divider">Basic product details</div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Product name</span>
            </div>
            <input type="text" placeholder="Product name" className="input input-bordered w-full h-9" />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Color</span>
            </div>
            <MultiSelectDropdown options={options} selectedOptions={selectedOptions} onChange={handleChange} formatOptionLabel={formatOptionLabel} />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Pick size</span>
            </div>
            <select className="select select-bordered select-sm w-full h-9">
              <option disabled selected>
                Pick one
              </option>
              {sizes.map((size, index) => (
                <option key={index}>{size}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Categories</span>
            </div>
            <select className="select select-bordered select-sm w-full h-9">
              <option disabled selected>
                Pick Category
              </option>
              {categories?.data?.map((category: Category) => (
                <option key={category.id}>
                  {category.name}
                  <span> ({category.description})</span>
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Occasions</span>
            </div>
            <MultiSelectDropdown selectedOptions={occasionoptions} onChange={handleOccasionsChange} options={occasions} formatOptionLabel={undefined} />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Fabric type</span>
            </div>
            <input type="text" placeholder="Fabric type" className="input input-bordered w-full h-9" />
          </label>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="divider">Upload product Image</div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div className="flex flex-col lg:flex-row justify-start items-center">
          <div className="mb-4 lg:mb-0">
            <ImageUploader onImagesUploaded={handleImagesUploaded} />
          </div>
          <div className="lg:ml-8 flex-grow">
            <DragAndDrop items={images} setItems={setImages} />
          </div>
        </div>
      </div>

      {/* Product Specification */}

      <div className="flex flex-col w-full">
        <div className="divider">Product Specification</div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Sleeve Length</span>
            </div>
            <input type="text" placeholder="Sleeve Length" className="input input-bordered w-full h-9" />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Shape</span>
            </div>
            <input type="text" placeholder="Shape" className="input input-bordered w-full h-9" />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Neck</span>
            </div>
            <input type="text" placeholder="Neck" className="input input-bordered w-full h-9" />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Print or pattern</span>
            </div>
            <input type="text" placeholder="Print or pattern" className="input input-bordered w-full h-9" />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Design Styling</span>
            </div>
            <input type="text" placeholder="Design Styling" className="input input-bordered w-full h-9" />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Slit Detail</span>
            </div>
            <input type="text" placeholder="Slit Detail" className="input input-bordered w-full h-9" />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Ornamentation</span>
            </div>
            <input type="text" placeholder="Ornamentation" className="input input-bordered w-full h-9" />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Length</span>
            </div>
            <input type="text" placeholder="Length" className="input input-bordered w-full h-9" />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Number of Items</span>
            </div>
            <input type="text" placeholder="Number of Items" className="input input-bordered w-full h-9" />
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Total stock</span>
            </div>
            <input type="text" placeholder="Total stock" className="input input-bordered w-full h-9" />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-1">
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Detailed description</span>
            </div>
            <textarea className="textarea textarea-bordered" placeholder="Enter detailed description of product"></textarea>
          </label>
        </div>
      </div>

      {/* Pricing and Discounts */}
      <div className="flex flex-col w-full">
        <div className="divider">Pricing and Discounts</div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                MRP
                <div className="lg:tooltip ml-1" data-tip="Actual price without discount">
                  <button>
                    <IoIosInformationCircleOutline />
                  </button>
                </div>
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">₹</span>
              <input type="text" placeholder="Price" className="input input-bordered w-full h-9 pl-8" value={mrp} onChange={(e) => setMrp(e.target.value)} />
            </div>
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Discount (%)</span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">%</span>
              <input
                type="text"
                placeholder="Discount"
                className="input input-bordered w-full h-9 pl-8"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </label>
        </div>
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Price after discount
                <div className="lg:tooltip ml-1" data-tip="Discounted price">
                  <button>
                    <IoIosInformationCircleOutline />
                  </button>
                </div>
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">₹</span>
              <input
                type="text"
                placeholder="Effective price after discount"
                className="input input-bordered w-full h-9 pl-8 hover:cursor-not-allowed"
                readOnly
                value={effectivePrice}
                onChange={(e) => setEffectivePrice(e.target.value)}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
