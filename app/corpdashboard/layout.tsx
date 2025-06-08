"use client";
import PanelAside from "@/components/Panel/PanelAside/PanelAside";
import "@/styles/global.css";
import { CorpNavItems } from "@/src/constants/navItems";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PanelAside navItems={CorpNavItems} mode="corp">
      {children}
    </PanelAside>
  );
}
