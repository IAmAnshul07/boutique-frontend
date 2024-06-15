"use client";
import React, { useState } from "react";
import AddOccasionModal from "@/components/modal/add-occasion-modal";
import { useAddTagMutation, useGetTagsQuery, useUpdateTagMutation } from "@/redux/services/tag";
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
  const [tagData, setTagData] = useState({ name: "" });

  const [addOccasion] = useAddTagMutation();
  const [updateTags] = useUpdateTagMutation();
  const { data, isError } = useGetTagsQuery("");
  console.log("Fetched Tags Data:", data);

  const openModal = () => {
    setShowModal(true);
  };

  if (isError || !data) {
    return <div>Error fetching data.</div>;
  }

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setTagData({ name: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTagData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (tag: TagData) => {
    setEditMode(true);
    setTagData(tag);
    setSelectedTag(tag);
    openModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editMode && selectedTag) {
        await updateTags({ id: selectedTag.id, name: tagData.name }).unwrap();
      } else {
        await addOccasion({ name: tagData.name }).unwrap();
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
          {data?.data?.length ? (
            <Table columns={columns} data={data.data} handleEdit={handleEdit} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-center text-2xl">No occasions found</p>
            </div>
          )}
        </div>
      </div>
      {showModal && <AddOccasionModal onClose={closeModal} onChange={handleChange} onSubmit={handleSubmit} tagData={tagData} isEditMode={editMode} />}
    </>
  );
};

export default Tag;
