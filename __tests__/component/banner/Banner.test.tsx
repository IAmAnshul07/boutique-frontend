import "@testing-library/jest-dom";
import Banner from "../../../src/components/banner";
import { render, screen } from "@testing-library/react";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe("Banner Component", () => {
  it("renders the Banner component", () => {
    render(<Banner />);
  });

  it("shoulder render the left images in the banner", () => {
    render(<Banner />);
    const productImage = screen.getByAltText("leftImage");
    expect(productImage).toBeInTheDocument();
  });

  it("shoulder render the center images in the banner", () => {
    render(<Banner />);
    const productImage = screen.getByAltText("centerImage");
    expect(productImage).toBeInTheDocument();
  });

  it("shoulder render the right images in the banner", () => {
    render(<Banner />);
    const productImage = screen.getByAltText("rightImage");
    expect(productImage).toBeInTheDocument();
  });

  it("should render all the images with correct alt text", () => {
    render(<Banner />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3);
    expect(images[0]).toHaveAttribute("alt", "leftImage");
    expect(images[1]).toHaveAttribute("alt", "centerImage");
    expect(images[2]).toHaveAttribute("alt", "rightImage");
  });
});
