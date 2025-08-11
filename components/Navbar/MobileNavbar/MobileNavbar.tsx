"use client";
import React, { useState } from "react";
import { EllipsisVertical, House, User, LayoutDashboard } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MobileNavbarSlider from "../MobileNavbarSlider/MobileNavbarSlider";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import {
    AdminNavItems,
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

const MobileNavItems = [
    { name: "خانه", path: "/", icon: <House /> },
    { name: "داشبورد", path: "/dashboard/profile", icon: <LayoutDashboard /> },
    { name: "پروفایل", path: "/profile", icon: <User /> },
    { name: "بیشتر", path: "", icon: <EllipsisVertical size={24} /> },
];

export default function MobileNavbar() {
    const pathname = usePathname();
    const [dashMode, setDashMode] = useState("customer");
    const dispatch = useDispatch();
    const accessToken = useSelector((state: any) => state.user.accessToken);
    const router = useRouter();
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
                mode={dashMode}
            />
            <div className="fixed bottom-3 w-full flex justify-center items-center z-40">
                <div className="min-h-[6vh] flex justify-evenly items-center bg-warm-white p-2 w-[90%] rounded-full mx-auto neo-oval">
                    {MobileNavItems.map((select) => {
                        if (select.name === "بیشتر") {
                            return (
                                <SidebarTrigger
                                    className="neo-btn rounded-lg! p-1.5 w-[36px]! h-[36px]!"
                                    key={select.name}
                                >
                                    <button>{select.icon}</button>
                                </SidebarTrigger>
                            );
                        } else if (select.name === "داشبورد") {
                            return (
                                <Select
                                    key={select.name}
                                    onValueChange={(value) => {
                                        setDashMode(value);
                                        if (value === "customer") {
                                            router.push("/dashboard/profile");
                                        } else if (value === "corp") {
                                            router.push(
                                                "/corpdashboard/installed-panels"
                                            );
                                        } else if (value === "admin") {
                                            router.push(
                                                "/admin-dashboard/manage-users"
                                            );
                                        }
                                    }}
                                >
                                    <SelectTrigger
                                        onClick={() => {
                                            if (!accessToken) {
                                                router.push("/login");
                                            }
                                        }}
                                        className={
                                            pathname === select.path
                                                ? "neo-btn-active p-1.5 text-[#FA682D]"
                                                : "neo-btn rounded-lg! p-1.5"
                                        }
                                    >
                                        <div>{select.icon}</div>
                                    </SelectTrigger>
                                    <SelectContent className="w-full h-full bg-warm-white neo-card p-1 ">
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                            <SelectItem
                                                value="customer"
                                                className="cursor-pointer neo-btn rounded-lg! bg-transparent text-center flex items-center justify-center"
                                            >
                                                <span>داشبورد کاربر</span>
                                            </SelectItem>
                                            <SelectItem
                                                value="corp"
                                                className="cursor-pointer neo-btn rounded-lg! bg-transparent text-center flex items-center justify-center "
                                            >
                                                <span>داشبورد شرکت</span>
                                            </SelectItem>
                                            <SelectItem
                                                value="admin"
                                                className="cursor-pointer neo-btn rounded-lg! bg-transparent flex items-center justify-center "
                                            >
                                                داشبورد ادمین
                                            </SelectItem>
                                        </div>
                                    </SelectContent>
                                </Select>
                            );
                        } else if (select.name === "پروفایل") {
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
                                            {accessToken ? (
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
                                                            dispatch(
                                                                resetUser()
                                                            );
                                                            router.push("/");
                                                        }}
                                                        className="cursor-pointer neo-btn rounded-lg! bg-transparent w-full py-2 px-3"
                                                    >
                                                        خروج
                                                    </button>
                                                </>
                                            ) : (
                                                <Link
                                                    href="/login"
                                                    className="cursor-pointer neo-btn rounded-lg! bg-transparent w-full py-2 px-3"
                                                >
                                                    ورود
                                                </Link>
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>
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
