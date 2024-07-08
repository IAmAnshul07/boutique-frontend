import DetailedProductDescription from "@/components/product-details";
import ViewProduct from "@/components/view-product";
import { productData } from "@/lib/women";

const ProductDetails = () => {
  return (
    <>
      <div className="flex mb-10">
        <ViewProduct productData={productData} />
        <DetailedProductDescription product={productData[0]} />
      </div>
    </>
  );
};

export default ProductDetails;
