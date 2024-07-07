"use client";
import React, { useState } from "react";
import AddOccasionModal from "@/components/modal/add-occasion-modal";
import { useAddTagMutation, useDeleteTagMutation, useGetTagsQuery, useUpdateTagMutation } from "@/redux/services/tag";
import Table from "@/components/table";

interface TagData {
  id: number;
  name: string;
}

const Tag = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<TagData | null>(null);
  const [deleteToast, setDeleteToast] = useState<boolean>(false);

  const [addOccasion] = useAddTagMutation();
  const [updateTags] = useUpdateTagMutation();
  const [deleteTag] = useDeleteTagMutation();
  const { data, isError } = useGetTagsQuery();
  console.log("Fetched Tags Data:", data);

  const openModal = () => {
    setShowModal(true);
  };

  if (isError || !tagsData) {
    return <div>Error fetching data.</div>;
  }

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedTag(null);
  };

  const handleEdit = (tag: TagData) => {
    setEditMode(true);
    setSelectedTag(tag);
    openModal();
  };

  const handleDelete = async (tagId: number) => {
    try {
      await deleteTag(tagId).unwrap();
      setDeleteToast(true);
      setTimeout(() => setDeleteToast(false), 3000);
    } catch (error) {
      console.log("Error deleting occasion", error);
    }
  };

  const handleSubmit = async (formData: { name: string }) => {
    try {
      if (editMode && selectedTag) {
        await updateTags({ id: selectedTag.id, name: formData.name }).unwrap();
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
          {tagsData?.data?.length ? (
            <Table columns={columns} data={tagsData.data} handleEdit={handleEdit} handleDelete={handleDelete} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-center text-2xl">No occasions found</p>
            </div>
          )}
        </div>
      </div>
      {showModal && <AddOccasionModal onClose={closeModal} tagData={selectedTag || { name: "" }} isEditMode={editMode} onSubmit={handleSubmit} />}
    </>
  );
};

export default Tag;
