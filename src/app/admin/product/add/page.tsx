"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
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
  const methods = useForm();
  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const price = watch("price");
  const discount = watch("discount");
  const [effectivePrice, setEffectivePrice] = useState("");

  const { data: colorsData } = useGetColorsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: occasion } = useGetTagsQuery();
  // eslint-disable-next-line sonarjs/no-duplicate-string
  const inputError = "input-error";

  const options: Option[] =
    colorsData?.result?.map((color: any) => ({
      value: color.id,
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
    const mrpValue = parseFloat(price);
    const discountValue = parseFloat(discount);
    if (!isNaN(mrpValue) && !isNaN(discountValue)) {
      const calculatedEffectivePrice = mrpValue - (mrpValue * discountValue) / 100;
      setEffectivePrice(calculatedEffectivePrice.toFixed(2));
    } else {
      setEffectivePrice("");
    }
  }, [price, discount]);

  const onSubmit = (data: any) => {
    console.log("Form Submitted", data);
    // Handle form submission logic here
  };

  const formatOptionLabel = (option: Option) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className="rounded-full" style={{ backgroundColor: option.hex, width: 20, height: 20, marginRight: 10 }}></div>
      <span>{option.label}</span>
    </div>
  );

  const handleImagesUploaded = (newImages: Image[]) => {
    const images = watch("images") || [];

    const newValue = [...images, ...newImages].filter((uploadedImage, index, array) => {
      const fileIndex = array.findIndex((duplicateFilterFile) => duplicateFilterFile.fileName === uploadedImage.fileName);
      return fileIndex === index;
    });
    setValue("images", newValue);
  };

  return (
    <FormProvider {...methods}>
      <form className="container mt-5 mb-10 flex flex-col flex-grow" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex items-center h-15">
          <h1 className="text-md text-4xl font-semibold">Add Product</h1>
        </div>

        {/* Basic Product Details */}
        <div className="flex flex-col w-full">
          <div className="divider text-xl">Basic product details</div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          {/* Product Name */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Product name</span>
              </div>
              <input
                {...control.register("name", { required: true })}
                type="text"
                placeholder="Product name"
                className={`input input-bordered w-full ${errors.name ? inputError : ""} h-9`}
              />

              {errors.name && <p className="text-red mt-1">Product name is required</p>}
            </label>
          </div>

          {/* Color */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Color</span>
              </div>
              <Controller
                name="colors"
                control={control}
                rules={{ required: true }}
                defaultValue={[]} // Ensure you set a default value (like an empty array)
                render={({ field: { onChange, value, ...field } }) => (
                  <div className={`w-full ${errors.colors ? "input-error" : ""}`}>
                    <MultiSelectDropdown
                      selectedOptions={value} // Bind selectedOptions to the current value from react-hook-form
                      onChange={onChange} // Bind onChange to update the value in react-hook-form
                      options={options} // Options for the dropdown
                      formatOptionLabel={formatOptionLabel}
                      {...field} // Spread the remaining field props
                    />
                  </div>
                )}
              />
              {errors.colors && <p className="text-red mt-1">Colors are required</p>}
            </label>
          </div>

          {/* Size */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Pick size</span>
              </div>
              <select
                {...control.register("size", { required: true })}
                defaultValue=""
                className={`input input-bordered w-full ${errors.size ? inputError : ""} h-9`}
              >
                <option disabled value="">
                  Pick one
                </option>
                {sizes.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            {errors.size && <p className="text-red mt-1">Size is required</p>}
          </div>

          {/* Categories */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Categories</span>
              </div>
              <select
                {...control.register("category", { required: true })}
                defaultValue=""
                className={`input input-bordered w-full ${errors.category ? inputError : ""} h-9`}
              >
                <option disabled value="">
                  Pick Category
                </option>
                {categories?.data?.map((category: Category) => (
                  <option key={category.id} value={category.name}>
                    {category.name} ({category.description})
                  </option>
                ))}
              </select>
            </label>
            {errors.category && <p className="text-red mt-1">Category is required</p>}
          </div>

          {/* Occasions */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Occasions</span>
              </div>
              <Controller
                name="occasions"
                control={control}
                rules={{ required: true }}
                defaultValue={[]} // Set a default value (an empty array initially)
                render={({ field: { onChange, value, ...field } }) => (
                  <MultiSelectDropdown
                    selectedOptions={value} // Bind selectedOptions to value from react-hook-form
                    onChange={onChange} // Update value in react-hook-form when selection changes
                    options={occasions} // Options for the dropdown
                    formatOptionLabel={undefined} // Pass the formatOptionLabel if needed, or leave as undefined
                    {...field} // Spread other field properties
                  />
                )}
              />
            </label>
            {errors.occasions && <p className="text-red mt-1">Occsasion is required</p>}
          </div>

          {/* Fabric Type */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Fabric type</span>
              </div>
              <input
                {...control.register("fabricType", { required: true })}
                type="text"
                placeholder="Fabric type"
                className={`input input-bordered w-full ${errors.name ? "input-error" : ""} h-9`}
              />
              {errors.fabricType && <p className="text-red mt-1">Fabric type is required</p>}
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col w-full">
          <div className="divider text-xl">Upload product Image</div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div className="flex flex-col lg:flex-row justify-start items-center">
            <div className="mb-4 lg:mb-0">
              <Controller
                name="images"
                control={control}
                rules={{ required: true }} // Required validation rule
                defaultValue={[]} // Default value as an empty array
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <>
                    <ImageUploader
                      onImagesUploaded={(images) => {
                        onChange(images); // Update the react-hook-form state with uploaded images
                        handleImagesUploaded(images); // Your custom handler
                      }}
                    />
                    {error && <p className="text-red mt-1">At least one image is required</p>}
                  </>
                )}
              />
            </div>
            <div className="lg:ml-8 flex-grow">
              <DragAndDrop />
            </div>
          </div>
        </div>

        {/* Product Specification */}
        <div className="flex flex-col w-full">
          <div className="divider text-xl">Product Specification</div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          {/* Sleeve Length */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Sleeve Length</span>
              </div>
              <input {...control.register("sleeveLength")} type="text" placeholder="Sleeve Length" className="input input-bordered w-full h-9" />
            </label>
          </div>

          {/* Shape */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Shape</span>
              </div>
              <input {...control.register("shape")} type="text" placeholder="Shape" className="input input-bordered w-full h-9" />
            </label>
          </div>

          {/* Neck */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Neck</span>
              </div>
              <input {...control.register("neck")} type="text" placeholder="Neck" className="input input-bordered w-full h-9" />
            </label>
          </div>

          {/* Print or Pattern */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Print or pattern</span>
              </div>
              <input {...control.register("printPattern")} type="text" placeholder="Print or pattern" className="input input-bordered w-full h-9" />
            </label>
          </div>

          {/* Design Styling */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Design Styling</span>
              </div>
              <input {...control.register("designStyling")} type="text" placeholder="Design Styling" className="input input-bordered w-full h-9" />
            </label>
          </div>

          {/* Slit Detail */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Slit Detail</span>
              </div>
              <input {...control.register("slitDetail")} type="text" placeholder="Slit Detail" className="input input-bordered w-full h-9" />
            </label>
          </div>

          {/* Ornamentation */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Ornamentation</span>
              </div>
              <input {...control.register("ornamentation")} type="text" placeholder="Ornamentation" className="input input-bordered w-full h-9" />
            </label>
          </div>

          {/* Length */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Length</span>
              </div>
              <input {...control.register("length")} type="text" placeholder="Length" className="input input-bordered w-full h-9" />
            </label>
          </div>

          {/* Number of Items */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Number of Items</span>
              </div>
              <input
                {...control.register("numberOfItems", { validate: (value) => value > 0 || "Number of items cannot be less than one" })}
                type="text"
                placeholder="Number of Items"
                className="input input-bordered w-full h-9"
                onInput={(e) => {
                  const inputValue = (e.target as HTMLInputElement).value;
                  (e.target as HTMLInputElement).value = inputValue.replace(/[^0-9]/g, ""); // only allow numbers
                }}
              />
            </label>
          </div>

          {/* Total Stock */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Total stock</span>
              </div>
              <input
                {...control.register("totalStock", { required: true, min: 0, validate: (value) => value > 0 || "Please add atleast one product in the stock" })}
                type="text"
                placeholder="Total stock"
                className={`input input-bordered ${errors.totalStock ? inputError : ""} w-full h-9`}
                onInput={(e) => {
                  const inputValue = (e.target as HTMLInputElement).value;
                  (e.target as HTMLInputElement).value = inputValue.replace(/[^0-9]/g, ""); // only allow numbers
                }}
              />
            </label>
            {errors.totalStock && <p className="text-red mt-1">Total stock is required</p>}
          </div>
        </div>

        {/* Detailed Description */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-1">
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Detailed description</span>
              </div>
              <textarea
                {...control.register("detailedDescription", { required: true })}
                className={`textarea textarea-bordered ${errors.detailedDescription ? "textarea-error" : ""}`}
                placeholder="Enter detailed description of product"
              ></textarea>
            </label>
            {errors.detailedDescription && <p className="text-red mt-1">Detailed description required</p>}
          </div>
        </div>

        {/* Pricing and Discounts */}
        <div className="flex flex-col w-full">
          <div className="divider text-xl">Pricing and Discounts</div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
          {/* MRP */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  MRP
                  <div className="lg:tooltip ml-1" data-tip="Actual price without discount">
                    <IoIosInformationCircleOutline />
                  </div>
                </span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">₹</span>
                <input
                  {...control.register("price", { required: true, validate: (value) => value > 0 || "MRP cannot be zero" })}
                  type="text"
                  placeholder="Price"
                  className={`input input-bordered w-full h-9 pl-8 ${errors.price ? inputError : ""} `}
                  onInput={(e) => {
                    const inputValue = (e.target as HTMLInputElement).value;
                    (e.target as HTMLInputElement).value = inputValue.replace(/[^0-9]/g, ""); // only allow numbers
                  }}
                />
              </div>
            </label>
            {errors.price && <p className="text-red mt-1">MRP is required</p>}
          </div>

          {/* Discount */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Discount (%)</span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">%</span>
                <input
                  {...control.register("discount", { required: true, validate: (value) => value > 0 || "Discount cannot be negative" })}
                  type="text"
                  placeholder="Discount"
                  className={`input input-bordered w-full h-9 pl-8 ${errors.discount ? inputError : ""} `}
                  onInput={(e) => {
                    const inputValue = (e.target as HTMLInputElement).value;
                    (e.target as HTMLInputElement).value = inputValue.replace(/[^0-9]/g, ""); // only allow numbers
                  }}
                />
              </div>
            </label>
            {errors.discount && <p className="text-red mt-1">Discount is required</p>}
          </div>

          {/* Effective Price */}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  Price after discount
                  <div className="lg:tooltip ml-1" data-tip="Discounted price">
                    <IoIosInformationCircleOutline />
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
                />
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default AddProduct;
