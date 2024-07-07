"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
import AdminHeader from "@/components/admin/header";
import AdminSidebar from "@/components/admin/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex">
          <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col lg:ml-72.5">
            <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
