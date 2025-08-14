"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/Background/InteractiveGridPattern";

import { PanelAsideProps, NavItem } from "@/src/types/PanelAsideTypes";
import styles from "./PanelAside.module.css";
import {
    SidebarContent,
    Sidebar,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Activity, Columns2 } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    PanelAsideIcon,
    PanelAsideTitle,
} from "./PanelAsideItem/PanelAsideItem";
import { SwitchCorp } from "@/components/PanelAside/SwitchCorp/SwitchCorp";
import useClientCheck from "@/src/hooks/useClientCheck";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
const myFont = localFont({ src: "../../../public/fonts/vazir/Vazir.ttf" });
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";

const PanelAside = ({
    children,
    navItems,
    navItemsMonitoring,
    mode = "customer",
}: PanelAsideProps) => {
    const pathname = usePathname();
    const isClient = useClientCheck();
    // const [loading, setLoading] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [sideOpen, setSideOpen] = useState<boolean>(true);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // 768px is typical mobile breakpoint
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (!isClient) return <LoadingSpinner />;

    if (isMobile) {
        return <main className="rtl w-screen pb-18">{children}</main>;
    }

    return (
        <div
            className={`flex fixed h-full w-full bg-[#F0EDEF] under-navbar-content vazir`}
            dir="rtl"
        >
            <SidebarProvider open={sideOpen}>
                <Sidebar
                    side="right"
                    className="w-64 bg-[#F0EDEF] text-white p-2 z-10 under-navbar-content border-0!"
                >
                    <SidebarContent className="bg-[#F0EDEF] no-scrollbar flex justify-between">
                        <nav className="bg-transparent">
                            {
                                // loading ? (
                                //     <>
                                //         {Array.from({ length: mockSkelethons }).map(
                                //             (_, index) => (
                                //                 <Skeleton
                                //                     className="h-10 w-full"
                                //                     key={index}
                                //                 />
                                //             )
                                //         )}
                                //     </>
                                // ) : (
                                navItems.map((item: NavItem, index) => (
                                    <PanelAsideTitle
                                        item={item}
                                        mode={mode}
                                        key={index}
                                    />
                                ))
                                // )
                            }
                            {mode == "admin" &&
                                (isClient ? (
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full no-underline"
                                    >
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger
                                                // className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-pointer
                                                // 		hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200
                                                //     }`}
                                                className="px-2 hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200 my-0 py-2"
                                            >
                                                {/* <Link href={""}>
                                                <span
                                                    className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-pointer hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200`}
                                                >
                                                    پایش اطلاعات
                                                </span>
                                            </Link> */}
                                                <span
                                                    className={`flex gap-2 w-full text-[#003a8b] mt-0.5 rounded-lg cursor-pointer text-md`}
                                                >
                                                    پایش اطلاعات
                                                </span>
                                                {/* <span>پایش اطلاعات</span> */}
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col text-base mr-4">
                                                {navItemsMonitoring?.map(
                                                    (item: NavItem, index) => (
                                                        <Link
                                                            key={item.path}
                                                            href={item.path}
                                                        >
                                                            <span
                                                                className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-pointer ${
                                                                    pathname ===
                                                                    item.path
                                                                        ? `shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] bg-gradient-to-r ${"from-[#FF5B18] to-[#FF6809]"} text-white`
                                                                        : "hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200"
                                                                }`}
                                                            >
                                                                {item.name}
                                                            </span>
                                                        </Link>
                                                    )
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ) : (
                                    <Skeleton className="h-10 w-full" />
                                ))}
                        </nav>
                        {mode === "corp" && <SwitchCorp />}
                    </SidebarContent>
                </Sidebar>
                <div
                    className={`${
                        sideOpen ? "ml-3" : "mx-3"
                    } flex flex-col items-center justify-between h-[100vh]`}
                >
                    <div className="text-white">
                        {
                            // loading ? (
                            //     <div className="space-y-2">
                            //         {Array.from({ length: mockSkelethons }).map(
                            //             (_, index) => (
                            //                 <Skeleton
                            //                     className="h-10 w-10"
                            //                     key={index}
                            //                 />
                            //             )
                            //         )}
                            //     </div>
                            // ) : (
                            navItems.map((item: NavItem, index) => (
                                <PanelAsideIcon
                                    item={item}
                                    mode={mode}
                                    key={index}
                                />
                            ))
                            // )
                        }
                        {mode == "admin" && (
                            <PanelAsideIcon
                                item={{
                                    name: "",
                                    path: "",
                                    RNPName: "",
                                    icon: <Activity />,
                                }}
                                mode={mode}
                            />
                        )}
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
                        {pathname !== "/admin-dashboard" && (
                            <InteractiveGridPattern
                                width={40}
                                height={40}
                                squares={[50, 50]}
                                x={-1}
                                y={-1}
                                strokeDasharray={"4 2"}
                                className={cn(
                                    "absolute inset-0 h-full w-full [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
                                )}
                            />
                        )}
                        {children}
                    </div>
                    <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_-4px_-4px_5px_rgba(255,255,255,1),inset_4px_4px_5px_rgba(0,0,0,0.3)] z-20"></div>
                </main>
            </SidebarProvider>
        </div>
    );
};

export default PanelAside;
