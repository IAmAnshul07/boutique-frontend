import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import DetailedProductDescription from "../../../src/components/product-details";
import { ImageDataType } from "@/types/product";

jest.mock("../../../src/components/rating", () => ({ value }: { value: number }) => <div data-testid="rating">{`Rating: ${value}`}</div>);
jest.mock("../../../src/components/review", () => () => <div data-testid="write-review">WriteReview</div>);
jest.mock("../../../src/components/checkPincode", () => () => <div data-testid="check-pincode">CheckPincode</div>);
jest.mock("../../../src/components/select-size", () => () => <div data-testid="pick-size">PickSize</div>);

const mockProduct: ImageDataType = {
  productName: "Test Product",
  discountPrice: 999,
  actualPrice: 1999,
  discountPercentage: 50,
  rating: 4.5,
  id: "",
  index: 0,
  src: "",
  size: "",
  productDetails: "",
};

describe("DetailedProductDescription Component", () => {
  it("renders product details correctly", () => {
    render(<DetailedProductDescription product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Rs. 999")).toBeInTheDocument();
    expect(screen.getByText("MRP. 1999")).toBeInTheDocument();
    expect(screen.getByText("(50% off)")).toBeInTheDocument();
    expect(screen.getByText("inclusive of all taxes")).toBeInTheDocument();
  });

  it("renders the size picker", () => {
    render(<DetailedProductDescription product={mockProduct} />);
    expect(screen.getByTestId("pick-size")).toBeInTheDocument();
  });

  it("renders desktop buttons on large screens", () => {
    render(<DetailedProductDescription product={mockProduct} />);

    const mobileAddToCartButton = screen.getByTestId("desktop-cart-button");
    const mobileBuyNowButton = screen.getByTestId("desktop-buy-now-button");

    expect(mobileAddToCartButton).toBeInTheDocument();
    expect(mobileBuyNowButton).toBeInTheDocument();
  });

  it("renders mobile buttons on small screens", () => {
    render(<DetailedProductDescription product={mockProduct} />);

    const mobileAddToCartButton = screen.getByTestId("mobile-cart-button");
    const mobileBuyNowButton = screen.getByTestId("mobile-buy-now-button");

    expect(mobileAddToCartButton).toBeInTheDocument();
    expect(mobileBuyNowButton).toBeInTheDocument();
  });

  it("renders the rating component with correct value", () => {
    render(<DetailedProductDescription product={mockProduct} />);
    expect(screen.getByTestId("rating")).toHaveTextContent("Rating: 4.5");
  });

  it("renders the review section", () => {
    render(<DetailedProductDescription product={mockProduct} />);

    expect(screen.getByText("Review")).toBeInTheDocument();
    expect(screen.getByText("BE THE FIRST TO REVIEW THIS PRODUCT")).toBeInTheDocument();
    expect(screen.getByTestId("write-review")).toBeInTheDocument();
  });

  it("renders the CheckPincode component", () => {
    render(<DetailedProductDescription product={mockProduct} />);
    expect(screen.getByTestId("check-pincode")).toBeInTheDocument();
  });

  it("renders the product details list", () => {
    render(<DetailedProductDescription product={mockProduct} />);

    expect(screen.getByText("Square cuffs, patch pocket")).toBeInTheDocument();
    expect(screen.getByText("Package contains: 1 jumpsuit")).toBeInTheDocument();
    expect(screen.getByText("Machine wash cold")).toBeInTheDocument();
    expect(screen.getByText("Pure cotton")).toBeInTheDocument();
  });
});
