import React from "react";
import { EllipsisVertical, House, Search } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MobileNavbarSlider from "../MobileNavbarSlider/MobileNavbarSlider";
import { navItems } from "@/src/constants/navItems";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MobileNavItems = [
  { name: "خانه", path: "/", icon: <House /> },
  { name: "داشبورد", path: "/dashboard/my-panels", icon: <LayoutDashboard /> },
  {
    name: "در برق نو بفروشید!",
    path: "/landing/corp-introduction",
    icon: <Search />,
  },
  { name: "بیشتر", path: "", icon: <EllipsisVertical size={24}/> },
];

export default function MobileNavbar() {
  const pathname = usePathname();
  return (
    <>
      <MobileNavbarSlider navItems={navItems} />
      <div className="fixed bottom-3 w-full flex justify-center items-center z-40">
        <div className="min-h-[6vh] flex justify-evenly items-center bg-warm-white p-2 w-[90%] rounded-full mx-auto neo-oval">
          {MobileNavItems.map((select) => {
            if (select.name === "بیشتر") {
              return (
                <SidebarTrigger
                  className="neo-btn rounded-lg! p-1.5 w-[36px]! h-[36px]!"
                  key={select.name}
                >
                  <button className="">{select.icon}</button>
                </SidebarTrigger>
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
