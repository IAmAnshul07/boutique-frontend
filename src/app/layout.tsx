"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
import StoreProvider from "@/redux/StoreProvider";
import NewHeader from "../components/Header/NewHeader";
import Footer from "@/components/Footer";
// import Header from "@/components/Header";

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
                {/* <Header /> */}
                <NewHeader />
                {children}
                <Footer />
              </>
            )}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
