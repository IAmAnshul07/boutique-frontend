"use client";
import React, { useState } from "react";
import { useGetColorsQuery, useDeleteColorMutation, useCreateColorMutation, useUpdateColorMutation } from "@/redux/services/color";
import Table from "@/components/table";
import ColorModal from "@/components/modal/color-modal";

const ColorsSection: React.FC = () => {
  const { data, isError } = useGetColorsQuery();
  const [deleteColor] = useDeleteColorMutation();
  const [createColor] = useCreateColorMutation();
  const [updateColor] = useUpdateColorMutation();
  const [deleteToast, setDeleteToast] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    setSelectedColor(color);
    setIsModalOpen(true);
  };

  const handleSaveColor = async (colorName: string, colorHex: string) => {
    try {
      if (selectedColor) {
        await updateColor({ id: selectedColor.id, data: { name: colorName, hex: colorHex.toUpperCase() } });
      } else {
        await createColor({ data: { name: colorName, hex: colorHex.toUpperCase() } });
      }
      setSelectedColor(null);
    } catch (error) {
      console.error("Error saving color:", error);
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    {
      header: "Color",
      accessor: "hex",
      render: (row: any) => <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: row.hex }}></div>,
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full">
        {deleteToast && (
          <div className="toast toast-center toast-middle">
            <div className="alert bg-red">
              <span className="text-white">Color deleted successfully.</span>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mx-2 mt-5 h-15 rounded-lg">
          <h1 className="font-semibold text-md mx-5 text-4xl">Colors</h1>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            Add
          </button>
        </div>

        {/* Table Section */}
        <div className="w-full">
          <div className="overflow-x-auto">
            {isError ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-center text-2xl">Error fetching data</p>
              </div>
            ) : (
              <Table columns={columns} data={data?.result || []} handleEdit={handleEdit} handleDelete={handleDelete} />
            )}
          </div>
        </div>

        <ColorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveColor} selectedColor={selectedColor} />
      </div>
    </>
  );
};

export default ColorsSection;
