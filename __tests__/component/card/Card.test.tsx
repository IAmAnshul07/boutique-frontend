import Card from "../../../src/components/card/index.jsx";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProductDetails } from "@/types/product";

// Mock product details
const mockProduct: ProductDetails = {
  // eslint-disable-next-line sonarjs/no-duplicate-string
  name: "Sample Product",
  price: 100,
  currency: "$",
  image: ["/sample-image.jpg"],
  rating: 4.5,
  discount: 20,
  id: 0,
  availability: false,
  brand: "",
};

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe("Card Component", () => {
  test("renders product name", () => {
    render(<Card product={mockProduct} />);
    const productName = screen.getByText(/Sample Product/i);
    expect(productName).toBeInTheDocument();
  });

  test("renders discounted price", () => {
    render(<Card product={mockProduct} />);
    const discountedPrice = screen.getByText("$ 80");
    expect(discountedPrice).toBeInTheDocument();
  });

  test("renders original price", () => {
    render(<Card product={mockProduct} />);
    const originalPrice = screen.getByText("$ 100");
    expect(originalPrice).toBeInTheDocument();
  });

  test("renders product image", () => {
    render(<Card product={mockProduct} />);
    const productImage = screen.getByAltText("Sample Product");
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute("src", "/sample-image.jpg");
  });

  test("renders Rating component with correct value", () => {
    render(<Card product={mockProduct} />);
    const ratingComponents = screen.getAllByRole("radio");
    expect(ratingComponents.length).toBe(10);
  });

  test("applies discount correctly", () => {
    const { rerender } = render(<Card product={mockProduct} />);
    const discountedPrice = screen.getByText("$ 80");
    expect(discountedPrice).toBeInTheDocument();

    rerender(
      <Card
        product={{
          ...mockProduct,
          discount: 50,
        }}
      />,
    );
    const updatedDiscountedPrice = screen.getByText("$ 50");
    expect(updatedDiscountedPrice).toBeInTheDocument();
  });

  test("handles truncation with tooltip for long product name", () => {
    render(
      <Card
        product={{
          ...mockProduct,
          name: "This is a very long product name that should be truncated",
        }}
      />,
    );
    const tooltip = screen.getByText("This is a very long product name that should be truncated");
    expect(tooltip).toBeInTheDocument();
  });

  test("handles multiple product images", () => {
    render(
      <Card
        product={{
          ...mockProduct,
          image: ["/image1.jpg", "/image2.jpg"],
        }}
      />,
    );
    const productImage = screen.getByAltText("Sample Product");
    expect(productImage).toHaveAttribute("src", "/image1.jpg");
  });
});
