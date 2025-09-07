"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
import StoreProvider from "@/redux/StoreProvider";
import NewHeader from "../components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { SessionLensInitializer } from "@/components/SessionLensInitializer";
import { PageTracker } from "@/components/PageTracker";
import ErrorTracker from "@/components/ErrorTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading] = useState<boolean>(false);
  const pathname = usePathname();
  const isAuthRoute = !(pathname === "/signup" || pathname === "/signin");
  const isAdminRoute = pathname.includes("admin");

  return (
    <html lang="en" data-theme="light">
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <SessionLensInitializer>
            <PageTracker pathname={pathname} />
            <ErrorTracker />
            <div>
              {loading ? (
                <Loader />
              ) : (
                <>
                  {isAuthRoute && !isAdminRoute && <NewHeader />}
                  {children}
                  {isAuthRoute && !isAdminRoute && <Footer />}
                </>
              )}
            </div>
          </SessionLensInitializer>
        </StoreProvider>
      </body>
    </html>
  );
}
