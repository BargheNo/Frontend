"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import localFont from "next/font/local";

import { PanelAsideProps, NavItem } from "@/src/types/PanelAsideTypes";
import styles from "./PanelAside.module.css";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Columns2, LayoutDashboard, PanelRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// const myFont = localFont({ src: '../public/fonts/vazir/Vazir.ttf' })
const myFont = localFont({ src: "../../../public/fonts/vazir/Vazir.ttf" });

const PanelAside = ({
  children,
  navItems,
  navItemsMonitoring,
  mode = "customer",
}: PanelAsideProps) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical mobile breakpoint
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div
      className={`flex fixed h-full w-full bg-[#F0EDEF] under-navbar-content ${myFont.className}`}
      dir="rtl"
    >
      <SidebarProvider open={sideOpen}>
        <Sidebar
          side="right"
          className="w-64 bg-[#F0EDEF] text-white p-2 z-10 under-navbar-content border-0!"
        >
          <SidebarContent className="bg-[#F0EDEF]">
            <nav className="space-y-2 bg-transparent">
              {navItems.map((item: NavItem) => (
                <Link key={item.path} href={item.path}>
                  <span
                    className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-pointer ${
                      pathname === item.path
                        ? `shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] bg-gradient-to-r ${
                            mode === "customer"
                              ? "from-[#A55FDA] to-[#F37240]"
                              : mode === "corp"
                              ? "from-[#2979FF] to-[#1b6cf5]"
                              : "from-[#FF5B18] to-[#FF6809]"
                          } text-white`
                        : "hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200"
                    }`}
                  >
                    {/* {item.icon} */}
                    {item.name}
                  </span>
                </Link>
              ))}
              {mode == "admin" && (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger
                      className={`flex gap-2 text-md text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-pointer ${
                        pathname === "/admin-dashboard/monitoring"
                          ? `shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] bg-gradient-to-r ${"from-[#FF5B18] to-[#FF6809]"} text-white`
                          : "hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200"
                      }`}
                    >
                      {"پایش اطلاعات"}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col text-base mr-4">
                      {navItemsMonitoring?.map((item: NavItem) => (
                        <Link key={item.path} href={item.path}>
                          <span
                            className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-pointer ${
                              pathname === item.path
                                ? `shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] bg-gradient-to-r ${"from-[#FF5B18] to-[#FF6809]"} text-white`
                                : "hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200"
                            }`}
                          >
                            {/* {item.icon} */}
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </nav>
          </SidebarContent>
        </Sidebar>
        <div
          className={`${
            sideOpen ? "ml-3" : "mx-3"
          } flex flex-col items-center justify-between h-[100vh]`}
        >
          <div>
            {navItems.map((item: NavItem) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-pointer ${
                  pathname === item.path
                    ? `shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] bg-gradient-to-r ${
                        mode === "customer"
                          ? "from-[#A55FDA] to-[#F37240]"
                          : mode === "corp"
                          ? "from-[#2979FF] to-[#1b6cf5]"
                          : "from-[#FF5B18] to-[#FF6809]"
                      } text-white`
                    : "hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200"
                }`}
              >
                {item.icon}
              </Link>
            ))}
          </div>
          <span className="cursor-pointer mb-22 shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] rounded-lg p-1">
            <Columns2
              size={30}
              color={`${sideOpen ? "#F37240" : "#003a8b"} `}
              className="transition-colors duration-300"
              onClick={() => {
                setSideOpen((state) => !state);
              }}
            />
          </span>
        </div>

        <main className="rounded-xl ml-3 mb-2 flex-1 bg-white relative">
          <div className="absolute no-scrollbar overflow-y-auto top-0 left-0 right-0 bottom-0 rounded-xl bg-white z-10">
            {children}
          </div>
          <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_-4px_-4px_5px_rgba(255,255,255,1),inset_4px_4px_5px_rgba(0,0,0,0.3)] z-20"></div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default PanelAside;
