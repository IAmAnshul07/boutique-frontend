import DetailedProductDescription from "@/components/product-details";
import ViewProduct from "@/components/view-product";

export interface ImageDataType {
  id: string;
  index: number;
  src: string;
  productName: string;
  actualPrice: number;
  discountPrice: number;
  discountPercentage: number;
  size: string;
  productDetails: string;
  rating: number;
}

const imageSrc = "https://i.imgur.com/ErYYZnT.jpeg";
const productNameDetails = "Naughty Ninos Girls Sea Green Jumpsuit for 3 to 15 Years";
export const ImageData: ImageDataType[] = [
  {
    id: "1",
    src: `${imageSrc}`,
    productName: `${productNameDetails}`,
    actualPrice: 200,
    discountPrice: 100,
    index: 0,
    discountPercentage: 5,
    size: "S",
    productDetails: "",
    rating: 5,
  },
  {
    id: "2",
    src: `${imageSrc}`,
    productName: `${productNameDetails}`,
    actualPrice: 400,
    discountPrice: 100,
    index: 1,
    discountPercentage: 10,
    size: "M",
    productDetails: "",
    rating: 5,
  },
  {
    id: "3",
    src: `${imageSrc}`,
    productName: `${productNameDetails}`,
    actualPrice: 600,
    discountPrice: 200,
    index: 2,
    discountPercentage: 15,
    size: "XL",
    productDetails: "",
    rating: 5,
  },
  {
    id: "4",
    src: `${imageSrc}`,
    productName: `${productNameDetails}`,
    actualPrice: 800,
    discountPrice: 400,
    index: 3,
    discountPercentage: 20,
    size: "XXL",
    productDetails: "",
    rating: 5,
  },
  {
    id: "5",
    src: `${imageSrc}`,
    productName: `${productNameDetails}`,
    actualPrice: 1000,
    discountPrice: 400,
    index: 4,
    discountPercentage: 25,
    size: "XXXL",
    productDetails: "",
    rating: 5,
  },
  {
    id: "6",
    src: `${imageSrc}`,
    productName: `${productNameDetails}`,
    actualPrice: 500,
    discountPrice: 500,
    index: 5,
    discountPercentage: 35,
    size: "XXXXL",
    productDetails: "",
    rating: 5,
  },
];

const ProductDetails = () => {
  return (
    <>
      <div className="flex mb-10">
        <ViewProduct imageData={ImageData} />
        <DetailedProductDescription product={ImageData[0]} />
      </div>
    </>
  );
};

export default ProductDetails;
