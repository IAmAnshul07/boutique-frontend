import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-2.5 pl-6">
      {item.map((value: any, index: number) => (
        <li key={index}>
          <Link
            href={value.route}
            className={`${value.route === pathname ? "bg-gray-100" : ""} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-900 duration-300 ease-in-out hover:bg-gray-100`}
          >
            {value.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default memo(SidebarDropdown);
