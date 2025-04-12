import React from "react";
import { EllipsisVertical, House, Search } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MobileNavbarSlider from "../MobileNavbarSlider/MobileNavbarSlider";
import { navItems } from "@/src/constants/navItems";
import { usePathname } from "next/navigation";
import Link from "next/link";
// const selectToIcon = (selected: MOBILE_NAVBAR_SELECT, color?: string) => {
//   switch (selected) {
//     case MOBILE_NAVBAR_SELECT.HOME:
//       return <House color={color} size={28} />;
//     case MOBILE_NAVBAR_SELECT.SEARCH:
//       return <Search color={color} size={28} />;
//     case MOBILE_NAVBAR_SELECT.DASHBOARD:
//       return <LayoutDashboard color={color} size={28} />;
//     case MOBILE_NAVBAR_SELECT.PROFILE:
//       return <CircleUserRound color={color} size={28} />;
//     case MOBILE_NAVBAR_SELECT.MORE:
//       return <EllipsisVertical color={color} size={28} />;
//     default:
//       return <House color={color} size={28} />;
//   }
// };

const MobileNavItems = [
  // { name: "داشبورد", path: "/dashboard/dashboard", icon: <Gauge /> },
  { name: "خانه", path: "/", icon: <House /> },
  { name: "داشبورد", path: "/dashboard/my-panels", icon: <LayoutDashboard /> },
  { name: "در برق نو بفروشید!", path: "/landing/corp-introduction", icon: <Search /> },
  { name: "بیشتر", path: "", icon: <EllipsisVertical /> },
];

export default function MobileNavbar() {
  const pathname = usePathname();
  return (
    <>
      <MobileNavbarSlider navItems={navItems} />
      <div className="fixed bottom-3 w-full flex justify-center items-center z-50">
        <div className="h-[70px] flex justify-evenly items-center bg-[#F0EDEF] p-2 w-[90%] rounded-full mx-auto neo-oval">
          {MobileNavItems.map((select) => {
            console.log(select);
            if (select.name === "بیشتر") {
              // if (false) {
              return (
                <SidebarTrigger
                  key={select.name}
                  className="neo-btn p-1"
                  // className={
                  //   pathname.startsWith(select.path)
                  //     ? "neo-btn-active p-1"
                  //     : "neo-btn p-1"
                  // }
                  // onClick={() => changeSelect(select)}
                >
                  {select.icon}
                </SidebarTrigger>
              );
            } else {
              return (
                <Link href={select.path} key={select.name}>
                  <button
                    className={
                      pathname === select.path
                        ? "neo-btn-active p-1 text-[#FA682D]"
                        : "neo-btn p-1"
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
