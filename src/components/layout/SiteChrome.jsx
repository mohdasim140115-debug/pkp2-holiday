"use client";

import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWidgets from "./FloatingWidgets";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return children;

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
