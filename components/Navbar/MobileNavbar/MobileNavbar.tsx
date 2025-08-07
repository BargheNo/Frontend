"use client";
import React, { useState } from "react";
import { EllipsisVertical, House, User } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
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

const MobileNavItems = [
  { name: "خانه", path: "/", icon: <House /> },
  { name: "داشبورد", path: "/dashboard/my-panels", icon: <LayoutDashboard /> },
  { name: "پروفایل", path: "/profile", icon: <User /> },
  { name: "بیشتر", path: "", icon: <EllipsisVertical size={24} /> },
];

export default function MobileNavbar() {
  const pathname = usePathname();
  const [dashMode, setDashMode] = useState("customer");
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
                  // onClick={() => {
                  //   if (dashMode == "customer") {
                  //     router.replace("/dashboard/my-panels");
                  //   } else if (dashMode == "corp") {
                  //     router.replace("/corpdashboard/installed-panels");
                  //   } else {
                  //     router.replace("/admin-dashboard/manage-users");
                  //   }
                  // }}
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
                  }}
                >
                  <SelectTrigger
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
                      <Link className="w-full" href={"/dashboard/my-panels"}>
                        <SelectItem
                          className="cursor-pointer neo-btn rounded-lg! bg-transparent"
                          value="customer"
                        >
                          داشبورد کاربر
                        </SelectItem>
                      </Link>
                      <Link
                        className="w-full"
                        href={"/corpdashboard/installed-panels"}
                      >
                        <SelectItem
                          className="cursor-pointer neo-btn rounded-lg! bg-transparent"
                          value="corp"
                        >
                          داشبورد شرکت
                        </SelectItem>
                      </Link>
                      <Link
                        className="w-full"
                        href={"/admin-dashboard/manage-users"}
                      >
                        <SelectItem
                          className="cursor-pointer neo-btn rounded-lg! bg-transparent"
                          value="admin"
                        >
                          داشبورد ادمین
                        </SelectItem>
                      </Link>
                    </div>
                  </SelectContent>
                </Select>
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
