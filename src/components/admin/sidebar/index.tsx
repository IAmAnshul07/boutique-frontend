"use client";
import Sidebar from "@/components/sidebar";
import { adminMenuGroups } from "@/components/utils/menugroups/menuGroups";
interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) => {
  return <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} menuGroups={adminMenuGroups} />;
};

export default AdminSidebar;
