"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/sidebar/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading] = useState<boolean>(false);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      )}
    </div>
  );
}
