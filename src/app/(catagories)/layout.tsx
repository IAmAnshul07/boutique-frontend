"use client";
import Banner from "@/components/banner";
import Filter from "@/components/filter";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const renderBanner = () => {
    switch (pathname) {
      case "/men":
        return <Banner />;
      case "/women":
        // return <Banner />;
        return <div>Women ☕</div>;
      case "/kids":
        // return <Banner />;
        return <div>Kids </div>;
    }
  };

  return (
    <>
      {/* <Banner /> */}
      {renderBanner()}
      <div className="flex w-full">
        <div className=" w-1/5">
          <Filter />
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </>
  );
}
