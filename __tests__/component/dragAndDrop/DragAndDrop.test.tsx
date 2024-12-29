/* eslint-disable @next/next/no-img-element */
/* eslint-disable sonarjs/no-duplicate-string */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import DragAndDrop from "../../../src/components/dragAndDrop";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
  useForm: jest.fn(),
  FormProvider: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("../../../src/components/draggable", () => ({ id, src, index, onDelete }: any) => {
  return (
    <div data-testid={`draggable-${id}`}>
      <img src={src} alt={`Image-${index}`} />
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
});

describe("Drag and drop component", () => {
  const mockSetValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFormContext as jest.Mock).mockReturnValue({
      setValue: mockSetValue,
      watch: jest.fn(() => [
        { id: "1", src: "image1.jpg" },
        { id: "2", src: "image2.jpg" },
        { id: "3", src: "image3.jpg" },
      ]),
    });
  });

  it("renders the component with images", () => {
    render(<DragAndDrop />);
    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute("src", "image1.jpg");
    expect(images[1]).toHaveAttribute("src", "image2.jpg");
    expect(images[2]).toHaveAttribute("src", "image3.jpg");
  });

  it("deletes an image when the delete button is clicked", () => {
    render(<DragAndDrop />);

    const deleteButton = screen.getByText("Delete", { selector: '[data-testid="draggable-1"] button' });
    fireEvent.click(deleteButton);

    expect(mockSetValue).toHaveBeenCalledWith(
      "images",
      expect.arrayContaining([
        { id: "2", src: "image2.jpg" },
        { id: "3", src: "image3.jpg" },
      ]),
    );
  });
});
