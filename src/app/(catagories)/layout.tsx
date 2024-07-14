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
      default:
        return null;
    }
  };

  return (
    <>
      <div className="hidden md:block">{renderBanner()}</div>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/5">
          <Filter />
        </div>
        <div className="w-full lg:w-4/5">{children}</div>
      </div>
    </>
  );
}
