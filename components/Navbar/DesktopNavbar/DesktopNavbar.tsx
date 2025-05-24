import React from "react";
import { Sun } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { vazirBold } from "@/lib/fonts";
import { usePathname } from "next/navigation";
export default function DesktopNavbar() {
  const pathname = usePathname();
  return (
    <>
      <div className="h-[70px] fixed top-0 w-full flex flex-col justify-center items-center z-20">
        <div className="flex justify-between items-center h-[70%] w-[94%] rounded-full mx-auto bg-white py-3 px-5 border-2 border-gray-300">
          <div>
            {/* <Sun size={28} /> */}
          </div>
          <div className="flex flex-row-reverse justify-start items-center w-[50%] px-3 gap-8">
            {/* <CircleUserRound size={28} /> */}
            <Link className={[pathname==="/"? "text-[#FA682D]" : "", vazirBold.className].join(" ")} href={"/"}>
              خانه
            </Link>
            <Link
              className={[pathname?.startsWith("/dashboard") ? "text-[#FA682D]" : "", vazirBold.className].join(" ")}
              href={"/dashboard/my-panels"}
            >
              داشبورد
            </Link>
            <Link
              className={[pathname?.startsWith("/corpdashboard") ? "text-[#FA682D]" : "", vazirBold.className].join(" ")}
              href={"/corpdashboard/installed-panels"}
            >
              داشبورد شرکت
            </Link>
            <Link
              className={[pathname?.startsWith("/admin-dashboard") ? "text-[#FA682D]" : "", vazirBold.className].join(" ")}
              href={"/admin-dashboard/manage-users"}
            >
              داشبورد ادمین
            </Link>
            <Link className={`vazir-bold rtl ${pathname === "/landing/corp-introduction" ? "text-[#FA682D]" : ""}`} href={"/landing/corp-introduction"}
            >
              در برق نو بفروشید!
            </Link>
            {/* <Link className={["", vazirBold.className].join(" ")} href={"/"}>
              ایتم 4
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}
