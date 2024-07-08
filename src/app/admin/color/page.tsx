"use client";
import React, { useEffect, useState } from "react";
import { useGetColorsQuery, useDeleteColorMutation, useCreateColorMutation, useUpdateColorMutation } from "@/redux/services/color";
import Table from "@/components/table";
import ColorModal from "@/components/modal/color-modal";

const ColorsSection: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isError } = useGetColorsQuery({ page });
  const [deleteColor] = useDeleteColorMutation();
  const [createColor] = useCreateColorMutation();
  const [updateColor] = useUpdateColorMutation();
  const [deleteToast, setDeleteToast] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    if (data && data.result.length === 0 && page > 1) {
      setPage(1);
    }
  }, [data, page]);

  const handleDelete = async (colorId: number) => {
    try {
      await deleteColor(colorId);
      setDeleteToast(true);
      setTimeout(() => setDeleteToast(false), 3000);
    } catch (error) {
      console.error("Error Deleting Color!!", error);
    }
  };

  const nextPage = () => {
    if (page < Math.ceil(data?.count / 10)) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleEdit = (color: any) => {
    setSelectedColor(color);
    setIsModalOpen(true);
  };

  const handleSaveColor = async (colorName: string, colorHex: string) => {
    try {
      if (selectedColor) {
        await updateColor({ id: selectedColor.id, data: { name: colorName, hex: colorHex.toUpperCase() } });
        setSuccessToast("Color updated successfully");
      } else {
        await createColor({ data: { name: colorName, hex: colorHex.toUpperCase() } });
        setSuccessToast("Color added successfully");
      }
      setSelectedColor(null);
      setIsModalOpen(false);
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
        {successToast && (
          <div className="toast toast-center toast-middle">
            <div className="alert success-info bg-green-500">
              <span>{successToast}</span>
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
            {data?.result?.length ? (
              <Table columns={columns} data={data?.result || []} handleEdit={handleEdit} handleDelete={handleDelete} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-center text-2xl">No colors found</p>
              </div>
            )}
            <div className="join flex justify-center">
              <button className="join-item btn" onClick={prevPage} disabled={page === 1}>
                «
              </button>
              <button className="join-item btn">Page {page}</button>
              <button className="join-item btn" onClick={nextPage} disabled={page >= Math.ceil(data?.total / 10)}>
                »
              </button>
            </div>
          </div>
        </div>

        <ColorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveColor} selectedColor={selectedColor} />
      </div>
      {isError && (
        <div className="flex justify-center items-center h-full">
          <p className="text-center text-2xl">Error fetching data</p>
        </div>
      )}
    </>
  );
};

export default ColorsSection;
