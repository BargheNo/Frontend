"use client";
import React from "react";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import { useMediaQuery } from "react-responsive";

export default function Navbar() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile)
    return <MobileNavbar/>;
  else return <DesktopNavbar />;
}
