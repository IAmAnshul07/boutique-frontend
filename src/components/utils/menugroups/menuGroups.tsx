// data/menuGroups.ts
import { TbCategoryPlus, TbColorSwatch, TbDeviceAnalytics, TbRulerMeasure, TbListDetails } from "react-icons/tb";
import { GiPartyFlags } from "react-icons/gi";
import { PiDressBold } from "react-icons/pi";
import { MdAccountCircle, MdFolderShared } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";

export const adminMenuGroups = [
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

export const userMenuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <MdAccountCircle className="h-5 w-5" />,
        label: "My Account",
        route: "/profile",
      },
      {
        icon: <TbListDetails className="h-5 w-5" />,
        label: "Personal Details",
        route: "/profile/personal-details",
      },
      {
        icon: <MdFolderShared className="h-5 w-5" />,
        label: "My Orders",
        route: "/profile/my-orders",
      },
      {
        icon: <FaAddressBook className="h-5 w-5" />,
        label: "Saved Addresses",
        route: "/profile/saved-addresses",
      },
    ],
  },
];
