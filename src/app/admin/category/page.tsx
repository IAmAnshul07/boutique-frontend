"use client";
import React, { useState } from "react";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "@/redux/services/category";
import AddCategoryModal from "@/components/modal/category-modal/index";
import Table from "@/components/table"; // Import the generalized Table component

const CategoryList = () => {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode
  const { data, isError } = useGetCategoriesQuery({ page });
  const [deleteCategory] = useDeleteCategoryMutation();

  const nextPage = () => {
    if (page < Math.ceil(data?.total / 10)) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleEdit = (category: any) => {
    try {
      setIsEditMode(true);
      setSelectedCategory(category);
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

  if (isError) {
    return (
      <div className="toast toast-center toast-middle">
        <div className="alert bg-red">
          <span className="text-white">Error Finding Categories!!</span>
        </div>
      </div>
    );
  }

  const columns = [
    { header: "Category Name", accessor: "name" },
    { header: "Category Description", accessor: "description" },
  ];

  return (
    <>
      {showSuccessToast && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-info bg-red">
            <span>Category Deleted Successfully.</span>
          </div>
        </div>
      )}
      <div className="container flex flex-col flex-grow">
        <div className="flex justify-between items-center mx-2 mt-5 h-15 rounded-lg">
          <h1 className="font-semibold text-md mx-5 text-4xl">Categories</h1>
          <div>
            <button className="btn btn-primary" onClick={toggleModal}>
              Add
            </button>
          </div>
        </div>
        <div className="flex-grow pb-20 h-[40rem]">
          {data?.data?.length ? (
            <Table columns={columns} data={data.data} handleEdit={handleEdit} handleDelete={handleDelete} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-center text-2xl">No categories found</p>
            </div>
          )}
          <div className="join flex justify-center">
            <button className="join-item btn" onClick={prevPage}>
              «
            </button>
            <button className="join-item btn">Page {page}</button>
            <button className="join-item btn" onClick={nextPage}>
              »
            </button>
          </div>
        </div>
      </div>
      {showModal && <AddCategoryModal onClose={toggleModal} isEditMode={isEditMode} categoryDataToUpdate={selectedCategory} />}
    </>
  );
};

export default CategoryList;
