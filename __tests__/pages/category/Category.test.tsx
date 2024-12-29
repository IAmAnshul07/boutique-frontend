import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../../../src/redux/services/category";
import useToastPromise from "../../../src/hooks/useToastPromise/useToastPromise";
// import AddCategoryModal from "../../../src/components/modal/category-modal";
// import Table from "../../../src/components/table";
import CategoryList from "@/app/admin/category/page";

jest.mock("../../../src/redux/services/category", () => ({
  useDeleteCategoryMutation: jest.fn(),
  useGetCategoriesQuery: jest.fn(),
}));

jest.mock("../../../src/hooks/useToastPromise/useToastPromise.ts", () => ({
  __esModule: true,
  default: jest.fn(() => {
    jest.fn();
  }),
}));

jest.mock("../../../src/components/modal/category-modal", () => ({ onClose, isEditMode, categoryDataToUpdate }: any) => (
  <div data-testid="modal">
    <p>Modal Opened</p>
    {isEditMode && <p>Edit Mode</p>}
    {categoryDataToUpdate && <p>Category: {categoryDataToUpdate.name}</p>}
    <button onClick={onClose}>Close</button>
  </div>
));

jest.mock("../../../src/components/table", () => ({ data, handleEdit, handleDelete }: any) => (
  <table data-testid="category-table">
    <tbody>
      {data.map((category: any) => (
        <tr key={category.id} data-testid={`category-row-${category.id}`}>
          <td>{category.name}</td>
          <td>{category.description}</td>
          <td>
            <button onClick={() => handleEdit(category)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
));
describe("CategoryList Component", () => {
  const mockDeleteCategory = jest.fn();
  const mockToastPromise = jest.fn();
  //   const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToastPromise as jest.Mock).mockReturnValue({ toastPromise: mockToastPromise });
    (useDeleteCategoryMutation as jest.Mock).mockReturnValue([mockDeleteCategory]);
  });

  it("renders the component with categories", () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: {
        data: [
          // eslint-disable-next-line sonarjs/no-duplicate-string
          { id: 1, name: "Category 1", description: "Description 1" },
          // eslint-disable-next-line sonarjs/no-duplicate-string
          { id: 2, name: "Category 2", description: "Description 2" },
        ],
        total: 2,
      },
      isError: false,
    });

    render(<CategoryList />);
    const rows = screen.getAllByTestId(/category-row-/);
    expect(rows).toHaveLength(2);
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });

  it("displays an error message if there is an error", () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({ data: null, isError: true });

    render(<CategoryList />);
    expect(screen.getByText("Error Finding Categories!!")).toBeInTheDocument();
  });

  it("handles pagination controls", async () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: {
        data: [{ id: 1, name: "Category 1", description: "Description 1" }],
        total: 20,
      },
      isError: false,
    });

    render(<CategoryList />);

    expect(screen.getByText("Page 1")).toBeInTheDocument();

    (useGetCategoriesQuery as jest.Mock).mockReturnValueOnce({
      data: {
        data: [{ id: 2, name: "Category 2", description: "Description 2" }],
        total: 20,
      },
      isError: false,
    });

    const nextButton = screen.getByText("»");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Page 2")).toBeInTheDocument();
    });

    (useGetCategoriesQuery as jest.Mock).mockReturnValueOnce({
      data: {
        data: [{ id: 1, name: "Category 1", description: "Description 1" }],
        total: 20,
      },
      isError: false,
    });

    const prevButton = screen.getByText("«");
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  it("toggles the modal when 'Add' button is clicked", () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({ data: { data: [] }, isError: false });

    render(<CategoryList />);
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    expect(screen.getByTestId("modal")).toBeInTheDocument();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("handles edit functionality", () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: {
        data: [{ id: 1, name: "Category 1", description: "Description 1" }],
        total: 1,
      },
      isError: false,
    });

    render(<CategoryList />);
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(screen.getByText("Modal Opened")).toBeInTheDocument();
    expect(screen.getByText("Edit Mode")).toBeInTheDocument();
    expect(screen.getByText("Category: Category 1")).toBeInTheDocument();
  });

  it("handles delete functionality", async () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: {
        data: [{ id: 1, name: "Category 1", description: "Description 1" }],
        total: 1,
      },
      isError: false,
    });

    render(<CategoryList />);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockToastPromise).toHaveBeenCalledWith(
        mockDeleteCategory(1),
        expect.objectContaining({
          loading: "Loading...",
          success: "Category deleted successfully",
          error: "Error deleted category",
        }),
      );
    });
  });
});
