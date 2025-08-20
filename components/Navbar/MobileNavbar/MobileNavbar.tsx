"use client";
import React, { useEffect, useState } from "react";
import {
    EllipsisVertical,
    House,
    User,
    LayoutDashboard,
    LogIn,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MobileNavbarSlider from "@/components/Navbar/MobileNavbarSlider/MobileNavbarSlider";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
    AdminNavItems,
    AdminNavItemsMonitoring,
    CorpNavItems,
    UserNavItems,
} from "@/src/constants/navItems";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "@/src/store/slices/userSlice";
import MobileDashboard from "../DesktopNavbar/Dashboard/MobileDashboard";
import hasAdminAnyPermission from "@/src/functions/isAdmin";

const MobileNavItems = [
    { name: "خانه", path: "/", icon: <House /> },
    { name: "داشبورد", path: "/dashboard/profile", icon: <LayoutDashboard /> },
    { name: "پروفایل", path: "/profile", icon: <User /> },
    { name: "بیشتر", path: "", icon: <EllipsisVertical /> },
];

export default function MobileNavbar() {
    const pathname = usePathname();
    const [dashMode, setDashMode] = useState<"customer" | "corp" | "admin">(
        pathname?.startsWith("/corpdashboard")
            ? "corp"
            : pathname?.startsWith("/admin-dashboard")
            ? "admin"
            : "customer"
    );
    const dispatch = useDispatch();
    const accessToken = useSelector((state: any) => state.user.accessToken);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [isCorp, setIsCorp] = useState<boolean>(false);

    const isAdmin = hasAdminAnyPermission();
    const perms = useSelector((state: RootState) => state.user.permissions);
    const corps = useSelector((state: RootState) => state.user.corps);

    useEffect(() => {
        const corpsList = corps ?? [];
        setIsCorp(corpsList?.length > 0);
        // console.log(perms);
        const hasInitialized =
            typeof accessToken !== "undefined" &&
            typeof corps !== "undefined" &&
            typeof isAdmin != "undefined" &&
            typeof isCorp != "undefined";
        if (hasInitialized) {
            setLoading(false);
        }
    }, [accessToken, isAdmin, setLoading, isCorp, corps, perms]);
    return (
        <>
            <MobileNavbarSlider
                navItems={
                    dashMode == "customer"
                        ? UserNavItems
                        : dashMode == "corp"
                        ? CorpNavItems
                        : AdminNavItems
                }
                navItemsMonitoring={AdminNavItemsMonitoring}
                mode={dashMode}
            />
            <div className="fixed bottom-3 w-full flex justify-center items-center z-40">
                <div className="min-h-[6vh] flex justify-evenly items-center bg-warm-white p-2 w-[90%] rounded-full mx-auto neo-oval">
                    {MobileNavItems.map((select) => {
                        if (select.name === "بیشتر") {
                            if (!accessToken) {
                                return (
                                    <Popover key={select.name}>
                                        <PopoverTrigger>
                                            <button
                                                className={
                                                    pathname === select.path
                                                        ? "neo-btn-active p-1.5 text-[#FA682D]"
                                                        : "neo-btn rounded-lg! p-1.5"
                                                }
                                            >
                                                {select.icon}
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full h-full bg-warm-white neo-card py-2 px-3 border-none ">
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                                <>
                                                    <Link
                                                        href="/announcements"
                                                        className="cursor-pointer neo-btn rounded-lg! bg-transparent w-full py-2 px-3 text-center"
                                                    >
                                                        اطلاعیه‌ها
                                                    </Link>
                                                    {/* TODO add blogs route here*/}
                                                    <Link
                                                        href="/blogs"
                                                        className="cursor-pointer neo-btn rounded-lg! bg-transparent w-full py-2 px-3 text-center"
                                                    >
                                                        مطالب
                                                    </Link>
                                                </>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                );
                            } else {
                                return (
                                    <SidebarTrigger
                                        className="neo-btn rounded-lg! p-1.5 w-[36px]! h-[36px]!"
                                        key={select.name}
                                    >
                                        <button>{select.icon}</button>
                                    </SidebarTrigger>
                                );
                            }
                        } else if (select.name === "داشبورد") {
                            return (
                                <MobileDashboard
                                    key={select.name}
                                    accessToken={accessToken}
                                    isAdmin={isAdmin}
                                    isCorp={isCorp}
                                    setDashMode={setDashMode}
                                    dashMode={dashMode}
                                />
                            );
                        } else if (select.name === "پروفایل") {
                            return accessToken ? (
                                <Popover key={select.name}>
                                    <PopoverTrigger>
                                        <button
                                            className={
                                                pathname === select.path
                                                    ? "neo-btn-active p-1.5 text-[#FA682D]"
                                                    : "neo-btn rounded-lg! p-1.5"
                                            }
                                        >
                                            {select.icon}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full h-full bg-warm-white neo-card py-2 px-3 border-none ">
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                            <>
                                                <Link
                                                    href="/profile"
                                                    className="cursor-pointer neo-btn rounded-lg! bg-transparent w-full py-2 px-3 text-center"
                                                >
                                                    پروفایل
                                                </Link>
                                                <Link
                                                    href="/landing/corp-introduction"
                                                    className="cursor-pointer neo-btn rounded-lg! bg-transparent w-full py-2 px-3 bg-fire-orange text-center"
                                                >
                                                    ثبت شرکت
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        dispatch(resetUser());
                                                        router.push("/login");
                                                    }}
                                                    className="cursor-pointer neo-btn rounded-lg! bg-transparent w-full py-2 px-3"
                                                >
                                                    خروج
                                                </button>
                                            </>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            ) : (
                                <Link
                                    href="/login"
                                    className="cursor-pointer neo-btn rounded-lg! bg-transparent py-2 px-3"
                                >
                                    <LogIn />
                                </Link>
                            );
                        } else {
                            return (
                                <Link href={select.path} key={select.name}>
                                    <button
                                        className={
                                            pathname === select.path
                                                ? "neo-btn-active p-1.5 text-[#FA682D]"
                                                : "neo-btn rounded-lg! p-1.5"
                                        }
                                    >
                                        {select.icon}
                                    </button>
                                </Link>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
}
