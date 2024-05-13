"use client";
import ColorPicker from "@/components/color-picker";
import { useGetColorsQuery, useDeleteColorMutation } from "@/redux/services/color";
import { useState } from "react";

const ColorsSection: React.FC = () => {
  const { data, isLoading, isError } = useGetColorsQuery();
  const [deleteColor] = useDeleteColorMutation();
  const [deleteToast, setDeleteToast] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<any>(null); // State to store the selected color for editing

  const handleDelete = async (colorId: number) => {
    try {
      await deleteColor(colorId);
      setDeleteToast(true);
      setTimeout(() => setDeleteToast(false), 3000);
    } catch (error) {
      console.error("Error Deleting Color!!", error);
    }
  };

  const handleEdit = (color: any) => {
    setSelectedColor(color); // Set the selected color when Edit is clicked
  };

  return (
    <>
      {deleteToast && (
        <div className="toast toast-center toast-middle">
          <div className="alert bg-red">
            <span className="text-white">Color deleted successfully.</span>
          </div>
        </div>
      )}
      <ColorPicker selectedColor={selectedColor} /> {/* Pass the selected color to the ColorPicker component */}
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr className="flex justify-center items-center">
                  <td colSpan={4}>
                    <span className="loading loading-infinity loading-lg"></span>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={4}>Error fetching data</td>
                </tr>
              ) : (
                data.map((color: any) => (
                  <tr key={color.id}>
                    <td>{color.name}</td>
                    <td>
                      <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: color.hex }}></div>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-xs" onClick={() => handleEdit(color)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(color.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ColorsSection;
