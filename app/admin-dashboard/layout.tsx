"use client";
import PanelAside from "@/components/Panel/PanelAside/PanelAside";
import "@/styles/global.css";
import { AdminNavItems } from "@/src/constants/navItems";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PanelAside navItems={AdminNavItems} mode="admin">
      {children}
    </PanelAside>
  );
}
