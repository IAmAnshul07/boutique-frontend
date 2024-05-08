"use client";
import React, { useState, useEffect } from "react";
import { useUpdateCategoryMutation } from "@/redux/services/category";

const AddCategoryModal = ({ onClose, isEditMode, categoryDataToUpdate }: any) => {
  const [categoryData, setCategoryData] = useState({ name: "", description: "" });
  const [updateCategory] = useUpdateCategoryMutation();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showUpdateToast, setUpdateToast] = useState(false);

  useEffect(() => {
    if (isEditMode && categoryDataToUpdate) {
      setCategoryData({ name: categoryDataToUpdate.name, description: categoryDataToUpdate.description });
    } else {
      setCategoryData({ name: "", description: "" });
    }
  }, [isEditMode, categoryDataToUpdate]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (isEditMode && categoryDataToUpdate) {
        await updateCategory({ id: categoryDataToUpdate.id, data: categoryData });
        setUpdateToast(true);
        setTimeout(() => {
          setUpdateToast(false);
        }, 3000);
      }
      setCategoryData({ name: "", description: "" });
      onClose();
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal" open>
      <div className="modal-box bg-base-200">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold">Add Category</h1>
          <div className="divider"></div>
          <div className="flex justify-evenly">
            <input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={handleChange}
              placeholder="Enter Category Name"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="description"
              value={categoryData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="input input-bordered w-full max-w-xs mx-2"
            />
          </div>
          {isEditMode ? (
            <div className="flex justify-center items-center">
              <button type="submit" className="btn btn-primary m-2">
                Save Changes
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <button type="submit" className="btn btn-primary m-2">
                Save
              </button>
            </div>
          )}
        </form>
      </div>
      {showSuccessToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Category Updated!!</span>
          </div>
        </div>
      )}
      {showUpdateToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Category Updated!!</span>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default AddCategoryModal;
