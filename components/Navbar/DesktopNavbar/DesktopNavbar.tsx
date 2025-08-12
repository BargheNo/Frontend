"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { vazirBold } from "@/lib/fonts";
import { usePathname } from "next/navigation";
import Dashboard from "./Dashboard/Dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import hasAdminAnyPermission from "@/src/functions/isAdmin";
import { resetUser } from "@/src/store/slices/userSlice";

export default function DesktopNavbar() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [isCorp, setIsCorp] = useState<boolean>(false);
    const pathname = usePathname();
    const accessToken = useSelector(
        (state: RootState) => state.user
    ).accessToken;
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
            <div className="h-[70px] fixed top-0 w-full flex flex-col justify-center items-center z-20">
                <div className="flex justify-between items-center h-[70%] w-[94%] rounded-full mx-auto bg-white py-3 px-5 border-2 border-gray-300">
                    <div>{/* <Sun size={28} /> */}</div>
                    <>
                        {/* <div className="flex flex-row-reverse justify-start items-center w-[50%] gap-8"> */}
                        {/* <CircleUserRound size={28} /> */}
                        {loading ? (
                            <div className="flex w-full justify-between">
                                {/* left side */}
                                <div className="flex flex-row-reverse justify-end items-center w-[50%] gap-8">
                                    <Skeleton className="h-[20px] w-[60px] rounded-full" />
                                </div>
                                {/* right side */}
                                <div className="flex flex-row-reverse justify-start items-center w-[50%] gap-8">
                                    <Skeleton className="h-[20px] w-[40px] rounded-full" />
                                    <Skeleton className="h-[20px] w-[80px] rounded-full" />
                                    <Skeleton className="h-[20px] w-[120px] rounded-full" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex w-full justify-between">
                                <div className="flex flex-row-reverse justify-end items-center w-[50%] gap-8">
                                    {accessToken && (
                                        <Link
                                            className={`
										${vazirBold.className}`}
                                            href={"/login"}
                                            onClick={() =>
                                                dispatch(resetUser())
                                            }
                                        >
                                            خروج
                                        </Link>
                                    )}
                                </div>
                                <div className="flex flex-row-reverse justify-start items-center w-[50%] gap-8">
                                    <Link
                                        className={[
                                            pathname === "/"
                                                ? "text-[#FA682D]"
                                                : "",
                                            vazirBold.className,
                                        ].join(" ")}
                                        href={"/"}
                                    >
                                        خانه
                                    </Link>
                                    {!accessToken && (
                                        <Link
                                            className={`vazir-bold`}
                                            href={"/login"}
                                        >
                                            ورود
                                        </Link>
                                    )}
                                    <Dashboard
                                        accessToken={accessToken}
                                        isCorp={isCorp}
                                        isAdmin={isAdmin}
                                    />
                                    {accessToken && (
                                        <Link
                                            className={`vazir-bold rtl ${
                                                pathname ===
                                                "/landing/corp-introduction"
                                                    ? "text-[#FA682D]"
                                                    : ""
                                            }`}
                                            href={"/landing/corp-introduction"}
                                        >
                                            در برق نو بفروشید!
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* <Link
							className={[
								pathname?.startsWith("/dashboard")
									? "text-[#FA682D]"
									: "",
								vazirBold.className,
							].join(" ")}
							href={"/dashboard/my-panels"}
						>
							داشبورد
						</Link>
						<Link
							className={[
								pathname?.startsWith("/corpdashboard")
									? "text-[#FA682D]"
									: "",
								vazirBold.className,
							].join(" ")}
							href={"/corpdashboard/installed-panels"}
						>
							داشبورد شرکت
						</Link>
						<Link
							className={[
								pathname?.startsWith("/admin-dashboard")
									? "text-[#FA682D]"
									: "",
								vazirBold.className,
							].join(" ")}
							href={"/admin-dashboard/manage-users"}
						>
							داشبورد ادمین
						</Link> */}
                    </>
                </div>
            </div>
        </>
    );
}
