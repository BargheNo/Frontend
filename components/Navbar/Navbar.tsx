"use client";
import React from "react";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import { useMediaQuery } from "react-responsive";
import useClientCheck from "@/src/hooks/useClientCheck";

export default function Navbar() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // if (!useClientCheck()) return <>Loading...</>;
  // if (!useClientCheck()) return <></>;
  if (isMobile)
    return <MobileNavbar/>;
  else return <DesktopNavbar />;
}
