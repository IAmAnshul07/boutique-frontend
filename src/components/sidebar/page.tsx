"use client";
import Link from "next/link";

const Category = () => {
  return (
    <div>
      <div className="flex flex-col w-70 h-full bg-white p-4 shadow rounded">
        <Link href="/admin" className="btn btn-ghost">
          Dashboard
        </Link>
        <Link href="/admin/category" className="btn btn-ghost">
          Category
        </Link>
        <Link href="/admin/size" className="btn btn-ghost">
          Size
        </Link>
        <Link href="/admin/tag" className="btn btn-ghost">
          Tag
        </Link>
        <Link href="/admin/color" className="btn btn-ghost">
          Color
        </Link>
      </div>
    </div>
  );
};

export default Category;
