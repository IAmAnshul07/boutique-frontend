import { render, screen, fireEvent } from "@testing-library/react";
import Rating from "../../../src/components/rating";
import "@testing-library/jest-dom";

describe("Rating Component", () => {
  it("renders the Rating component with the correct initial value and tooltip", () => {
    render(<Rating value={3.5} />);
    const tooltipElement = screen.getByRole("form", { name: /Rating: 3.5/i });
    expect(tooltipElement).toBeInTheDocument();
    expect(tooltipElement).toHaveAttribute("data-tip", "3.5");
  });

  it("renders the correct number of stars based on value", () => {
    render(<Rating value={4} />);
    const stars = screen.getAllByRole("radio");
    expect(stars).toHaveLength(10);
  });

  it("disables stars when `disabled` prop is true", () => {
    render(<Rating value={5} disabled={true} />);
    const stars = screen.getAllByRole("radio");
    stars.forEach((star) => {
      expect(star).toBeDisabled();
    });
  });

  it("enables stars when `disabled` prop is false", () => {
    render(<Rating value={5} disabled={false} />);
    const stars = screen.getAllByRole("radio");
    stars.forEach((star) => {
      expect(star).toBeEnabled();
    });
  });

  it("applies the correct color class from the `color` prop", () => {
    render(<Rating value={5} color="bg-orange-500" />);
    const stars = screen.getAllByRole("radio");
    stars.forEach((star) => expect(star).toHaveClass("bg-orange-500"));
  });

  it("calls `onChange` with the correct value when a star is clicked", () => {
    const handleChange = jest.fn();
    render(<Rating value={3} disabled={false} onChange={handleChange} />);
    const stars = screen.getAllByRole("radio");
    fireEvent.click(stars[6]);
    expect(handleChange).toHaveBeenCalledWith(3.5);
  });

  it("does not call `onChange` when `disabled` is true", () => {
    const handleChange = jest.fn();
    render(<Rating value={3} disabled={true} onChange={handleChange} />);
    const stars = screen.getAllByRole("radio");
    fireEvent.click(stars[6]);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("updates the internal value correctly on star click", () => {
    const { rerender } = render(<Rating value={3} disabled={false} />);
    const stars = screen.getAllByRole("radio");
    fireEvent.click(stars[6]);
    rerender(<Rating value={3.5} disabled={false} />);
    expect(stars[6]).toBeChecked();
  });

  it("does not update the internal value when `disabled` is true", () => {
    render(<Rating value={3} disabled={true} />);
    const stars = screen.getAllByRole("radio");
    fireEvent.click(stars[6]);
    expect(stars[6]).not.toBeChecked();
  });

  it("maintains accessibility by setting `aria-label` for the tooltip", () => {
    render(<Rating value={4} />);
    const tooltipElement = screen.getByRole("form", { name: /Rating: 4/i });
    expect(tooltipElement).toHaveAttribute("aria-label", "Rating: 4");
  });

  it("renders correctly with default props", () => {
    render(<Rating value={2} />);
    const tooltipElement = screen.getByRole("form", { name: /Rating: 2/i });
    expect(tooltipElement).toHaveAttribute("data-tip", "2");
    const stars = screen.getAllByRole("radio");
  });
});
