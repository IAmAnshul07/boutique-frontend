import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fashion | Fashion Boutique",
  description: "This is Fashion Boutique Home",
};

export default function Home() {
  return (
    <>
      <Header />
    </>
  );
}
