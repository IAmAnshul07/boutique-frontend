"use client";
import React, { useState } from "react";
import AddOccasionModal from "@/components/modal/add-occasion-modal";
import { useAddOccasionMutation, useDeleteOccasionMutation, useGetOccasionsQuery, useUpdateOccasionMutation } from "@/redux/services/occasion";
import Table from "@/components/table";

interface OccasionData {
  id: number;
  name: string;
}

const Occasion = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionData | null>(null);
  const [deleteToast, setDeleteToast] = useState<boolean>(false);

  const [addOccasion] = useAddOccasionMutation();
  const [updateOccasion] = useUpdateOccasionMutation();
  const [deleteOccasion] = useDeleteOccasionMutation();
  const { data: occasionData, isError } = useGetOccasionsQuery();

  const openModal = () => {
    setShowModal(true);
  };

  if (isError || !occasionData) {
    return <div>Error fetching data.</div>;
  }

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedOccasion(null);
  };

  const handleEdit = (occasion: OccasionData) => {
    setEditMode(true);
    setSelectedOccasion(occasion);
    openModal();
  };

  const handleDelete = async (occasionId: number) => {
    try {
      await deleteOccasion(occasionId).unwrap();
      setDeleteToast(true);
      setTimeout(() => setDeleteToast(false), 3000);
    } catch (error) {
      console.log("Error deleting occasion", error);
    }
  };

  const handleSubmit = async (formData: { name: string }) => {
    try {
      if (editMode && selectedOccasion) {
        await updateOccasion({ id: selectedOccasion.id, name: formData.name }).unwrap();
      } else {
        await addOccasion({ name: formData.name }).unwrap();
      }
      closeModal();
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);
    } catch (error) {
      console.error("Error adding/updating occasion:", error);
    }
  };

  const columns = [{ header: "Occasions", accessor: "name" }];

  return (
    <>
      {successToast && (
        <div className="toast toast-center toast-middle">
          <div className="alert success-info bg-green-500">
            <span>{editMode ? "Occasion Updated Successfully" : "Occasion Added Successfully"}</span>
          </div>
        </div>
      )}
      {deleteToast && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-info bg-red">
            <span>Occasion deleted successfully!</span>
          </div>
        </div>
      )}
      <div className="container flex flex-col flex-grow">
        <div className="flex justify-between items-center mx-2 mt-5 h-15 rounded-lg">
          <h1 className="font-semibold text-md mx-5 text-4xl">Occasions</h1>
          <div>
            <button className="btn btn-primary" onClick={openModal}>
              Add
            </button>
          </div>
        </div>
        <div className="flex-grow pb-20 h-[40rem]">
          {occasionData?.data?.length ? (
            <Table columns={columns} data={occasionData.data} handleEdit={handleEdit} handleDelete={handleDelete} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-center text-2xl">No occasions found</p>
            </div>
          )}
        </div>
      </div>
      {showModal && <AddOccasionModal onClose={closeModal} occasionData={selectedOccasion || { name: "" }} isEditMode={editMode} onSubmit={handleSubmit} />}
    </>
  );
};

export default Occasion;
