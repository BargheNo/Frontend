
"use client";

import { usePathname } from "next/navigation";
import noNavbarPath from "@/lib/noNavbar";
import Navbar from "@/components/Navbar/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const noNavbarPaths = noNavbarPath();

  const shouldShowNavbar = !noNavbarPaths.some((path) =>
    pathname?.startsWith(path)
  );

  return shouldShowNavbar ? <Navbar /> : null;
}
