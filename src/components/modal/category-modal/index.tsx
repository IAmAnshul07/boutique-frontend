"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateCategoryMutation, useAddCategoryMutation } from "@/redux/services/category";
import { toast } from "react-toastify";

const AddCategoryModal = ({ onClose, isEditMode, categoryDataToUpdate }: any) => {
  const [updateCategory] = useUpdateCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
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
        toast.promise(updateCategory, {
          pending: "Updating category...",
          success: "Category updated successfully!!", // Message on success
          error: "Error updating category!", // Message on failure
        });
        onClose();
      } else {
        await addCategory({ data });
        toast.promise(addCategory, {
          pending: "Adding category...",
          success: "Category added successfully!!", // Message on success
          error: "Error adding category!", // Message on failure
        });
        onClose();
      }
      reset({ name: "", description: "" });
    } catch (error) {
      console.error("Error updating/adding category:", error);
    }
  };

  return (
    <>
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
                <input
                  type="text"
                  placeholder="Enter Category Name"
                  className="input input-bordered w-full max-w-xs"
                  {...register("name", { required: true })}
                />
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
      </dialog>
    </>
  );
};

export default AddCategoryModal;
