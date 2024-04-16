"use client";
import Banner from "@/components/banner";
import KidsBanner from "@/components/banner/kidsBanner";
import MenBanner from "@/components/banner/menBanner";
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
        return <MenBanner />;
      case "/women":
        return <Banner />;
      case "/kids":
        return <KidsBanner />;
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
