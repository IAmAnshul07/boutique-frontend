"use client";
import React from "react";
import { useGetCategoriesQuery } from "@/redux/services/category";

const Page = () => {
  const { data } = useGetCategoriesQuery();
  const categoriesExist = data && data.length > 0;

  return (
    <div className="container flex flex-col h-72">
      <div className="flex justify-between items-center mx-5 h-15 bg-base-200 rounded-lg">
        <h1 className="font-semibold text-md mx-2">Categories</h1>
        <div>
          <button className="btn btn-primary mx-2">Add</button>
        </div>
      </div>
      <div className="flex-grow mx-6">
        {categoriesExist ? (
          <ul className="list-none">
            {data.map((category: any) => (
              <li key={category.id} className="p-2 border-b">
                <span>{category.name}</span>
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
  );
};

export default Page;
