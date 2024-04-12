"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
import StoreProvider from "@/redux/StoreProvider";
import NewHeader from "../components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading] = useState<boolean>(false);
  const pathname = usePathname();
  const isAuthRoute = !(pathname === "/signup" || pathname === "/signin");
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <div>
            {loading ? (
              <Loader />
            ) : (
              <>
                {isAuthRoute && <NewHeader />}
                {children}
                {isAuthRoute && <Footer />}
              </>
            )}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
