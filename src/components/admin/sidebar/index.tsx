"use client";
import ClickOutside from "@/components/utils/ClickOutside";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { TbCategoryPlus, TbColorSwatch, TbDeviceAnalytics, TbRulerMeasure } from "react-icons/tb";
import { GiPartyFlags } from "react-icons/gi";
import { PiDressBold } from "react-icons/pi";
import { memo } from "react";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <TbDeviceAnalytics className="h-5 w-5" />,
        label: "Dashboard",
        route: "/admin",
      },
      {
        icon: <TbCategoryPlus className="h-5 w-5" />,
        label: "Category",
        route: "/admin/category",
      },
      {
        icon: <TbRulerMeasure className="h-5 w-5" />,
        label: "Size",
        route: "/admin/size",
      },
      {
        icon: <GiPartyFlags className="h-5 w-5" />,
        label: "Occasion",
        route: "/admin/occasion",
      },
      {
        icon: <TbColorSwatch className="h-5 w-5" />,
        label: "Color",
        route: "/admin/color",
      },
      {
        icon: <PiDressBold className="h-5 w-5" />,
        label: "Product",
        route: "#",
        children: [
          { label: "View Products", route: "/admin/product" },
          { label: "Add Products", route: "/admin/product/add" },
        ],
      },
    ],
  },
];

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) => {
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-base-100 duration-300 ease-linear lg:translate-x-0  drop-shadow-1 shadow-2 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            {/* <Image width={176} height={32} src={"/images/logo/logo.svg"} alt="Logo" priority /> */}
            FASHION
          </Link>

          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar" className="block lg:hidden">
            <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="px-4 py-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">{group.name}</h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem key={menuIndex} item={menuItem} />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default memo(AdminSidebar);

// <div>
//   <div className="flex flex-col w-70 h-full bg-white p-4 border-r border-base-300 rounded">
//     <Link href="/admin" className="btn btn-ghost">
//       Dashboard
//     </Link>
//     <Link href="/admin/category" className="btn btn-ghost">
//       Category
//     </Link>
//     <Link href="/admin/size" className="btn btn-ghost">
//       Size
//     </Link>
//     <Link href="/admin/tag" className="btn btn-ghost">
//       Occasion
//     </Link>
//     <Link href="/admin/color" className="btn btn-ghost">
//       Color
//     </Link>
//     <Link href="/admin/product/add" className="btn btn-ghost">
//       Add Product
//     </Link>
//   </div>
// </div>
