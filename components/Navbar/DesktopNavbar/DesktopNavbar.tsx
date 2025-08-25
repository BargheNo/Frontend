"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { vazirBold } from "@/lib/fonts";
import { usePathname } from "next/navigation";
import Dashboard from "./Dashboard/Dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import hasAdminAnyPermission from "@/src/functions/isAdmin";
import { resetUser, setCorpId, setCorps } from "@/src/store/slices/userSlice";
import { getData } from "@/src/services/apiHub";
import { resetCorps } from "@/src/store/slices/corpSlice";

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
    const corpId = useSelector((state: RootState) => state.user.corpId);

    useEffect(() => {
        // const corpsList = corps ?? [];
        // setIsCorp(corpsList?.length > 0);
        // console.log("corps", corps);
        setIsCorp(corps?.length ? corps?.length > 0 : false);
        const hasInitialized =
            typeof accessToken !== "undefined" &&
            typeof isAdmin != "undefined" &&
            typeof isCorp != "undefined";
        if (hasInitialized) {
            setLoading(false);
        }
        // if (accessToken) {
        //     getData({ endPoint: `/v1/user/corps` }).then((res) => {
        //         setIsCorp(res?.data?.length > 0);
        //         // if (!corps) {
        //         const newCorps = res?.data?.filter(
        //             (corp: any) =>
        //                 corp?.status !== "در انتظار تایید" &&
        //                 corp?.status !== "رد شده"
        //         );
        //         console.log("setting corps", newCorps);
        //         dispatch(setCorps(newCorps));
        //         // }
        //         if (!corpId) {
        //             dispatch(setCorpId(res?.data?.[0]?.id));
        //         }
        //         const hasInitialized =
        //             typeof accessToken !== "undefined" &&
        //             typeof isAdmin != "undefined" &&
        //             typeof isCorp != "undefined";
        //         if (hasInitialized) {
        //             setLoading(false);
        //         }
        //     });
        // }
    }, [
        corps,
        accessToken,
        isAdmin,
        isCorp,
        // accessToken,
        // isAdmin,
        // setLoading,
        // isCorp,
        // perms,
        // dispatch,
        // corps,
        // corpId,
    ]);
    return (
        <>
            <div className="h-[70px] fixed top-0 w-full flex flex-col justify-center items-center z-30">
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
                                    {/* {accessToken && (
                                        <Link
                                            className={`${vazirBold.className}`}
                                            href={"/login"}
                                            onClick={() =>
                                                dispatch(resetUser())
                                            }
                                        >
                                            خروج
                                        </Link>
                                    )} */}
                                </div>
                                {/* right side */}
                                <div className="flex flex-row-reverse justify-start items-center w-[50%] gap-8">
                                    <Skeleton className="h-[20px] w-[40px] rounded-full" />
                                    <Skeleton className="h-[20px] w-[80px] rounded-full" />
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
                                            onClick={() => {
                                                dispatch(resetUser());
                                                dispatch(resetCorps());
                                            }}
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
                                    <Link
                                        className={`vazir-bold rtl ${
                                            pathname?.startsWith(
                                                "/announcements"
                                            )
                                                ? "text-[#FA682D]"
                                                : ""
                                        }`}
                                        href={"/announcements"}
                                    >
                                        اطلاعیه‌ها
                                    </Link>
                                    <Link
                                        className={`vazir-bold rtl ${
                                            pathname?.startsWith(
                                                "/blogs"
                                            )
                                                ? "text-[#FA682D]"
                                                : ""
                                        }`}
                                        href={"/blogs"}
                                    >
                                        مطالب
                                    </Link>
                                    {accessToken && (
                                        <Link
                                            className={`vazir-bold rtl ${
                                                pathname === "/messages"
                                                    ? "text-[#FA682D]"
                                                    : ""
                                            }`}
                                            href={"/messages"}
                                        >
                                            اعلان‌ها
                                        </Link>
                                    )}
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
