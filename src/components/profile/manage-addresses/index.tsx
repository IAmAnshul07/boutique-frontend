"use client";
import Table from "@/components/table";
import { useRouter } from "next/navigation";
import React from "react";
import { GoPlus } from "react-icons/go";

const ManageAddresses = () => {
  const router = useRouter();

  const columns = [
    { header: "Address Holder", accessor: "name" },
    { header: "Detailed Address", accessor: "Detailed Address" },
  ];

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  const data = [
    {
      name: "test",
      "Detailed Address": "test",
    },
  ];

  return (
    <>
      <div className="text-xl font-bold flex justify-center itmes-center">Manage Address</div>
      <button className="btn ml-4" onClick={() => router.push("/add-address")}>
        <GoPlus />
        Add Address
      </button>
      <Table columns={columns} data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
    </>
  );
};

export default ManageAddresses;
