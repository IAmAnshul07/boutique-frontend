"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateCategoryMutation, useAddCategoryMutation } from "@/redux/services/category";
import { toast } from "react-toastify";
import { useSessionLens } from "@/hooks/useSessionLens";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AddCategoryModal = ({ onClose, isEditMode, categoryDataToUpdate }: any) => {
  const [updateCategory] = useUpdateCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
  const { trackEvent } = useSessionLens();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [formStartTime, setFormStartTime] = useState<number>(0);
  
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
    setFormStartTime(Date.now());
    
    // Track modal open
    trackEvent("modal_open", {
      modal_id: isEditMode ? "edit_category_modal" : "add_category_modal",
      source: "admin_panel",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      modal_type: "category_management",
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `Admin opened ${isEditMode ? "edit" : "add"} category modal`
    });
    
    if (isEditMode && categoryDataToUpdate) {
      setValue("name", categoryDataToUpdate.name);
      setValue("description", categoryDataToUpdate.description);
    } else {
      reset({ name: "", description: "" });
    }
  }, [isEditMode, categoryDataToUpdate, reset, setValue]);

  const handleModalClose = () => {
    trackEvent("modal_close", {
      modal_id: isEditMode ? "edit_category_modal" : "add_category_modal",
      source: "admin_panel",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      modal_type: "category_management",
      time_in_modal: Date.now() - formStartTime,
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      timestamp: new Date().toISOString(),
      event_summary: `Admin closed ${isEditMode ? "edit" : "add"} category modal after ${Math.floor((Date.now() - formStartTime) / 1000)} seconds`
    });
    
    onClose();
  };

  const onSubmit = async (data: any) => {
    const submissionStartTime = Date.now();
    
    trackEvent("form_submit", {
      form_id: isEditMode ? "edit_category_form" : "add_category_form",
      user_id: user?.id || "anonymous",
      user_role: user?.role || "guest",
      is_logged_in: !!user,
      error_count: Object.keys(errors).length,
      fields_filled: Object.values(data).filter(value => value && value.trim() !== "").length,
      total_fields: 2,
      completion_percentage: (Object.values(data).filter(value => value && value.trim() !== "").length / 2) * 100,
      form_duration_sec: Math.floor((submissionStartTime - formStartTime) / 1000),
      device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
      session_duration: Date.now() - (window as any).sessionStartTime || 0,
      timestamp: new Date().toISOString(),
      event_summary: `Admin submitted ${isEditMode ? "edit" : "add"} category form with ${Object.keys(errors).length} errors after ${Math.floor((submissionStartTime - formStartTime) / 1000)} seconds`
    });

    try {
      if (isEditMode && categoryDataToUpdate) {
        await updateCategory({ id: categoryDataToUpdate.id, data });
        
        trackEvent("admin_action", {
          action: "update_category",
          target_id: categoryDataToUpdate.id,
          target_name: data.name,
          user_id: user?.id || "anonymous",
          user_role: user?.role || "guest",
          success: true,
          action_duration_ms: Date.now() - submissionStartTime,
          device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
          timestamp: new Date().toISOString(),
          event_summary: `Admin successfully updated category "${data.name}" in ${Date.now() - submissionStartTime}ms`
        });
        
        toast.promise(updateCategory, {
          pending: "Updating category...",
          success: "Category updated successfully!!", // Message on success
          error: "Error updating category!", // Message on failure
        });
        onClose();
      } else {
        await addCategory({ data });
        
        trackEvent("admin_action", {
          action: "create_category",
          target_name: data.name,
          user_id: user?.id || "anonymous",
          user_role: user?.role || "guest",
          success: true,
          action_duration_ms: Date.now() - submissionStartTime,
          device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
          timestamp: new Date().toISOString(),
          event_summary: `Admin successfully created category "${data.name}" in ${Date.now() - submissionStartTime}ms`
        });
        
        toast.promise(addCategory, {
          pending: "Adding category...",
          success: "Category added successfully!!", // Message on success
          error: "Error adding category!", // Message on failure
        });
        onClose();
      }
      
      trackEvent("form_complete", {
        form_id: isEditMode ? "edit_category_form" : "add_category_form",
        success: true,
        completion_time_sec: Math.floor((Date.now() - formStartTime) / 1000),
        user_id: user?.id || "anonymous",
        user_role: user?.role || "guest",
        fields_completed: 2,
        total_fields: 2,
        error_count: 0,
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
        timestamp: new Date().toISOString(),
        event_summary: `${isEditMode ? "Edit" : "Add"} category form completed successfully in ${Math.floor((Date.now() - formStartTime) / 1000)} seconds`
      });
      
      reset({ name: "", description: "" });
    } catch (error) {
      trackEvent("admin_action", {
        action: isEditMode ? "update_category" : "create_category",
        target_name: data.name,
        user_id: user?.id || "anonymous",
        user_role: user?.role || "guest",
        success: false,
        error_message: "Something went wrong",
        action_duration_ms: Date.now() - submissionStartTime,
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
        timestamp: new Date().toISOString(),
        event_summary: `Admin failed to ${isEditMode ? "update" : "create"} category "${data.name}": Something went wrong`
      });
      
      trackEvent("form_error", {
        field: "category_operation",
        error_type: "api_error",
        message: "Something went wrong",
        form_id: isEditMode ? "edit_category_form" : "add_category_form",
        user_id: user?.id || "anonymous",
        error_severity: "high",
        is_retryable: true,
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
        timestamp: new Date().toISOString(),
        event_summary: `Category ${isEditMode ? "update" : "creation"} error: Something went wrong`
      });
      
      console.error("Error updating/adding category:", error);
    }
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal" open>
        <div className="modal-box bg-base-200">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>
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
