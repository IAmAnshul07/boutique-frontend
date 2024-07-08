"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateCategoryMutation, useAddCategoryMutation } from "@/redux/services/category";

const AddCategoryModal = ({ onClose, isEditMode, categoryDataToUpdate }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [updateCategory] = useUpdateCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showUpdateToast, setUpdateToast] = useState<boolean>(false);

  useEffect(() => {
    if (isEditMode && categoryDataToUpdate) {
      setValue("name", categoryDataToUpdate.name);
      setValue("description", categoryDataToUpdate.description);
    } else {
      reset({ name: "", description: "" });
    }
  }, [isEditMode, categoryDataToUpdate, reset, setValue]);

  const onSubmit = async (data: any) => {
    try {
      if (isEditMode && categoryDataToUpdate) {
        await updateCategory({ id: categoryDataToUpdate.id, data });
        setUpdateToast(true);
        setTimeout(() => {
          setUpdateToast(false);
        }, 3000);
      } else {
        await addCategory({ data });
        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 3000);
      }
      reset({ name: "", description: "" });
      onClose();
    } catch (error) {
      console.error("Error updating/adding category:", error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal" open>
      <div className="modal-box bg-base-200">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-xl font-semibold">{isEditMode ? "Edit" : "Add"} Category</h1>
          <div className="divider"></div>
          <div className="flex justify-evenly">
            <div className="flex flex-col">
              <input type="text" placeholder="Enter Category Name" className="input input-bordered w-full max-w-xs" {...register("name", { required: true })} />
              {errors.name && <p className="text-red mt-1">Name is required</p>}
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Enter Description"
                className="input input-bordered w-full max-w-xs"
                {...register("description", { required: true })}
              />
              {errors.description && <p className="text-red mt-1">Description is required</p>}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button type="submit" className="btn btn-primary m-2">
              {isEditMode ? "Save Changes" : "Save"}
            </button>
          </div>
        </form>
      </div>
      {showSuccessToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Category Added!!</span>
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
