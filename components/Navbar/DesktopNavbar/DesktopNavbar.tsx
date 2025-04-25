import React from "react";
import { Sun } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { vazirBold } from "@/lib/fonts";
import { usePathname, useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "@/src/store/slices/userSlice";
import { RootState } from "@/src/store/types";

export default function DesktopNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(resetUser());
    router.push("/");
  };

  const handleProfileClick = () => {
    if (!user.isAuth) {
      router.push("/login");
      return;
    }
    router.push("/dashboard/profile");
  };

  return (
    <>
      <div className="h-[70px] fixed top-0 w-full flex flex-col justify-center items-center z-20">
        <div className="flex justify-between items-center h-[70%] w-[94%] rounded-full mx-auto bg-white py-3 px-5 border-2 border-gray-300">
          <div>
            <Sun size={28} />
          </div>
          <div className="flex flex-row-reverse justify-start items-center w-[50%] px-3 gap-8">
            <Popover>
              <PopoverTrigger>
                <CircleUserRound size={28} className="cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2 border-0 bg-[#F0EDEF] shadow-2xl border-2 border-gray-300 rounded-md -translate-x-8">
                <div className="flex flex-col items-center gap-3 w-full">
                  <button 
                    onClick={handleProfileClick}
                    className="text-lg text-[#FA682D] border-2 rounded-md px-3 py-1 w-full text-center border-[#FA682D] hover:bg-[#fa672dd0] hover:text-white transition-colors"
                  >
                    {user.isAuth ? "پروفایل" : "ورود"}
                  </button>
                  {user.isAuth && (
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white rounded-md px-3 py-1 hover:bg-black text-lg transition-colors"
                    >
                      خروج
                    </button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <Link className={[pathname==="/"? "text-[#FA682D]" : "", vazirBold.className].join(" ")} href={"/"}>
              خانه
            </Link>
            <Link
              className={[pathname?.startsWith("/dashboard") ? "text-[#FA682D]" : "", vazirBold.className].join(" ")}
              href={"/dashboard/my-panels"}
            >
              داشبورد
            </Link>
            <Link className={`vazir-bold rtl ${pathname === "/landing/corp-introduction" ? "text-[#FA682D]" : ""}`} href={"/landing/corp-introduction"}
            >
              در برق نو بفروشید!
            </Link>
            <Link className={["", vazirBold.className].join(" ")} href={"/"}>
              ایتم 4
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
