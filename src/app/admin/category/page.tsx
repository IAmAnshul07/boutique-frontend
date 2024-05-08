"use client";
import React, { useState } from "react";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "@/redux/services/category";
import Skeleton from "@/components/skelaton";
import AddCategoryModal from "@/components/category-modal/index";

const CategoryList = () => {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode
  const { data, isLoading, isError } = useGetCategoriesQuery({ page: page });
  const [deleteCategory] = useDeleteCategoryMutation();

  const nextPage = () => {
    if (page < Math.ceil(data?.total / 10)) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleEdit = (categoryId: any) => {
    try {
      setIsEditMode(true);
      setSelectedCategory(categoryId);
      setShowModal(true);
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleDelete = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setIsEditMode(false); // Reset edit mode when closing the modal
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 min-w-full min-h-full justify-center items-center">
        <Skeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="toast toast-center toast-middle">
        <div className="alert bg-red">
          <span className="text-white">Error Finding Categories!!</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {showSuccessToast && (
        <div className="toast toast-center toast-middle">
          <div className="alert bg-red">
            <span className="text-white">Category deleted successfully.</span>
          </div>
        </div>
      )}
      <div className="container flex flex-col flex-grow">
        <div className="flex justify-between items-center mx-5 h-15 bg-base-200 rounded-lg">
          <h1 className="font-semibold text-md mx-2">Categories</h1>
          <div className="join flex m-2">
            <button className="join-item btn" onClick={prevPage}>
              «
            </button>
            <button className="join-item btn">Page {page}</button>
            <button className="join-item btn" onClick={nextPage}>
              »
            </button>
          </div>
          <div>
            <button className="btn btn-primary" onClick={toggleModal}>
              Add
            </button>
          </div>
        </div>
        <div className="flex-grow mx-6 pb-20 h-[45rem]">
          {data?.data?.length ? (
            <ul className="list-none">
              {data?.data?.map((category: any) => (
                <li key={category.id} className="p-2 border-b flex justify-between items-center">
                  <span>{category.name}</span>
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn">
                      ...
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li>
                        <a onClick={() => handleEdit(category)}>Edit</a> {/* Pass category object */}
                      </li>
                      <li>
                        <a onClick={() => handleDelete(category.id)}>Delete</a>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-center text-2xl">No categories found</p>
            </div>
          )}
        </div>
      </div>
      {showModal && <AddCategoryModal onClose={toggleModal} isEditMode={isEditMode} categoryDataToUpdate={selectedCategory} />}
    </>
  );
};

export default CategoryList;
