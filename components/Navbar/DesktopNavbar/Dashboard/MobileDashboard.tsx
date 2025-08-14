"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { vazirBold } from "@/lib/fonts";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import Link from "next/link";

export default function MobileDashboard({
    accessToken,
    isCorp,
    isAdmin,
    setDashMode,
    dashMode,
}: {
    accessToken: string;
    isCorp: boolean;
    isAdmin: boolean;
    dashMode: "customer" | "corp" | "admin";
    setDashMode: (mode: "customer" | "corp" | "admin") => void;
}) {
    const pathname = usePathname();
    const router = useRouter();

    // useEffect(() => {
    //     if (!accessToken) {
    //         router.push("/login");
    //     }
    // }, [accessToken, router]);
    if (!accessToken) return <></>;
    // If the user is only a customer
    if (!isCorp && !isAdmin) {
        return (
            <Link
                className={`${[
                    pathname?.startsWith("/dashboard") ? "text-[#FA682D]" : "",
                    vazirBold.className,
                ].join(" ")}`}
                href={"/dashboard"}
            >
                داشبورد
            </Link>
        );
    }

    return (
        <Select
            value={dashMode}
            onValueChange={(value) => {
                if (value === "customer") {
                    router.push("/dashboard/profile");
                    setDashMode("customer");
                } else if (value === "corp") {
                    router.push("/corpdashboard/installed-panels");
                    setDashMode("corp");
                } else if (value === "admin") {
                    // router.push("/admin-dashboard/manage-users");
                    setDashMode("admin");
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
                    pathname?.startsWith("/dashboard") ||
                    pathname?.startsWith("/corpdashboard") ||
                    pathname?.startsWith("/admin-dashboard")
                        ? "neo-btn-active p-1.5 text-[#FA682D]"
                        : "neo-btn rounded-lg! p-1.5"
                }
            >
                <span className={vazirBold.className}>داشبورد</span>
            </SelectTrigger>

            <SelectContent className="w-full h-full bg-warm-white neo-card p-1">
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <SelectItem
                        value="customer"
                        className="cursor-pointer neo-btn rounded-lg! bg-transparent text-center flex items-center justify-center"
                    >
                        داشبورد کاربر
                    </SelectItem>

                    {isCorp && (
                        <SelectItem
                            value="corp"
                            className="cursor-pointer neo-btn rounded-lg! bg-transparent text-center flex items-center justify-center"
                        >
                            داشبورد شرکت
                        </SelectItem>
                    )}

                    {isAdmin && (
                        <SelectItem
                            value="admin"
                            className="cursor-pointer neo-btn rounded-lg! bg-transparent text-center flex items-center justify-center"
                        >
                            داشبورد ادمین
                        </SelectItem>
                    )}
                </div>
            </SelectContent>
        </Select>
    );
}
