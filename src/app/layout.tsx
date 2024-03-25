"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
import StoreProvider from "@/redux/StoreProvider";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading] = useState<boolean>(false);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <div>
            {loading ? (
              <Loader />
            ) : (
              <>
                <Header />
                {children}
              </>
            )}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
