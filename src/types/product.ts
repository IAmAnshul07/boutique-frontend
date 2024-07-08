export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string[];
  discount: number;
  availability: boolean;
  brand: string;
  rating: number;
}

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
