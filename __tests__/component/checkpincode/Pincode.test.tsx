import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CheckPincode from "@/components/checkPincode";
import { useGetPostOfficeByPinQuery } from "../../../src/redux/services/checkPincode";

jest.mock("../../../src/redux/services/checkPincode", () => ({
  useGetPostOfficeByPinQuery: jest.fn(),
}));

const mockUseGetPostOfficeByPinQuery = useGetPostOfficeByPinQuery as jest.Mock;

describe("CheckPincode Component", () => {
  beforeEach(() => {
    mockUseGetPostOfficeByPinQuery.mockReset();
  });

  it("renders the input and button elements", () => {
    mockUseGetPostOfficeByPinQuery.mockReturnValue({ data: null });

    render(<CheckPincode />);

    expect(screen.getByPlaceholderText(/Please enter PIN code/i)).toBeInTheDocument();
    expect(screen.getByText(/Check/i)).toBeInTheDocument();
  });

  it("displays delivery options for a valid PIN code", async () => {
    mockUseGetPostOfficeByPinQuery.mockReturnValueOnce({ data: null, isError: true, isLoading: false, error: { message: "Network Error" } });

    mockUseGetPostOfficeByPinQuery.mockReturnValue({
      data: [
        {
          Status: "Success",
          PostOffice: [{ Name: "Post Office 1" }, { Name: "Post Office 2" }],
        },
      ],
    });

    render(<CheckPincode />);

    const input = screen.getByPlaceholderText(/Please enter PIN code/i);
    const button = screen.getByText(/Check/i);

    fireEvent.change(input, { target: { value: "123456" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Deliver to:")).toBeInTheDocument();
      expect(screen.getByText("Post Office 1")).toBeInTheDocument();
      expect(screen.getByText("Post Office 2")).toBeInTheDocument();
    });
  });

  it("shows an error message for an invalid PIN code", async () => {
    mockUseGetPostOfficeByPinQuery.mockReturnValue({
      data: [{ Status: "Error" }],
    });

    render(<CheckPincode />);

    const input = screen.getByPlaceholderText(/Please enter PIN code/i);
    const button = screen.getByText(/Check/i);

    fireEvent.change(input, { target: { value: "000000" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Invalid PIN code")).toBeInTheDocument();
    });
  });

  it("does not trigger API call when no PIN code is entered", () => {
    mockUseGetPostOfficeByPinQuery.mockReturnValue({ data: null });

    render(<CheckPincode />);

    const button = screen.getByText(/Check/i);
    fireEvent.click(button);

    expect(screen.queryByText("Deliver to:")).not.toBeInTheDocument();
  });

  it("handles empty post office data gracefully", async () => {
    mockUseGetPostOfficeByPinQuery.mockReturnValue({
      data: [
        {
          Status: "Success",
          PostOffice: [],
        },
      ],
    });

    render(<CheckPincode />);

    const input = screen.getByPlaceholderText(/Please enter PIN code/i);
    const button = screen.getByText(/Check/i);

    fireEvent.change(input, { target: { value: "123456" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText("Deliver to:")).not.toBeInTheDocument();
    });
  });

  it("handles unexpected API errors", async () => {
    mockUseGetPostOfficeByPinQuery.mockReturnValue({ data: null, isError: true, isLoading: false, error: { message: "Network Error" } });

    render(<CheckPincode />);

    const input = screen.getByPlaceholderText(/Please enter PIN code/i);
    const button = screen.getByText(/Check/i);

    fireEvent.change(input, { target: { value: "123456" } });
    fireEvent.click(button);

    await waitFor(() => {
      const errorMessage = screen.getByRole("alert");
      expect(errorMessage).toHaveTextContent("Invalid PIN code");
    });
  });
});
