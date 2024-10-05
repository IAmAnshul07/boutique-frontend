import DetailedProductDescription from "@/components/product-details";
import ViewProduct from "@/components/view-product";
import { productData } from "@/lib/women";

const ProductDetails = () => {
  return (
    <div className="flex flex-col lg:flex-row mb-10">
      <div className="lg:w-1/2 w-full mb-4 lg:mb-0">
        <ViewProduct productData={productData} />
      </div>
      <div className="lg:w-1/2 w-full">
        <DetailedProductDescription product={productData[0]} />
      </div>
    </div>
  );
};

export default ProductDetails;
