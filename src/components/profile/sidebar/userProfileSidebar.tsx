"use client";
import Sidebar from "@/components/sidebar";
import { userMenuGroups } from "@/components/utils/menugroups/menuGroups";
interface UserProfileSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const UserProfileSidebar = ({ sidebarOpen, setSidebarOpen }: UserProfileSidebarProps) => {
  return <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} menuGroups={userMenuGroups} />;
};

export default UserProfileSidebar;
