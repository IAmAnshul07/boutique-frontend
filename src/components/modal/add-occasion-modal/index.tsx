import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddOccasionModalProps {
  onClose: () => void;
  tagData: { name: string };
  isEditMode: boolean;
  onSubmit: (data: { name: string }) => void;
}

const AddOccasionModal: React.FC<AddOccasionModalProps> = ({ onClose, tagData, isEditMode, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (isEditMode && tagData) {
      setValue("name", tagData.name);
    } else {
      reset({ name: "" });
    }
  }, [isEditMode, tagData, setValue, reset]);

  return (
    <dialog id="my_modal_3" className="modal" open>
      <div className="modal-box bg-base-200">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-xl font-semibold text-center">{isEditMode ? "Edit" : "Add"} Occasion</h1>
          <div className="divider"></div>
          <div className="flex justify-center">
            <div className="flex flex-col items-center w-full">
              <input type="text" placeholder="Enter Occasion Name" className="input input-bordered w-full max-w-xs" {...register("name", { required: true })} />
              {errors.name && <p className="text-red mt-1">Occasion is required</p>}
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <button type="submit" className="btn btn-primary m-2">
              {isEditMode ? "Save Changes" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddOccasionModal;
