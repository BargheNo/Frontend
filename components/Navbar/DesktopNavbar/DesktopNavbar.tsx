"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { vazirBold } from "@/lib/fonts";
import { usePathname } from "next/navigation";
import Dashboard from "./Dashboard/Dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import hasPermission from "@/src/functions/hasPermission";

const adminPermissions = [
	"general.all",
	"user.view_all",
	"user.ban_unban",
	"user.change_role",
	"user.view_roles",
	"user.manage_role_permissions",
	"user.remove_role",
	"user.create_role",
	"corporation.view_all",
	"corporation.approve_decline",
	"installation_request.view_all",
	"installation_request.edit",
	"installation_request.remove",
	"ticket.view_all",
	"ticket.respond",
	"ticket.close",
	"ticket.comment",
	"report.view_all",
	"report.respond",
	"admin_blog.view_all",
	"admin_blog.create",
	"admin_blog.edit",
	"admin_blog.delete",
	"news.view_all",
	"news.create",
	"news.edit",
	"news.delete",
	"panel.view_all",
	"panel.create",
];

export default function DesktopNavbar() {
	const [loading, setLoading] = useState<boolean>(true);
	const pathname = usePathname();
	const corps = useSelector((state: RootState) => state).user.corps ?? [];
	const accessToken = useSelector((state: RootState) => state).user
		.accessToken;
	const isAdmin = adminPermissions
		.map((adminPermission) => hasPermission(adminPermission))
		.some((value) => value === true);
	const isCorp = corps?.length > 0;
	useEffect(() => {
		console.log(
			"hi",
			typeof accessToken !== "undefined",
			typeof corps !== "undefined",
			typeof isAdmin != "undefined",
			typeof isCorp != "undefined",
			"hi"
		);
		const hasInitialized =
			typeof accessToken !== "undefined" &&
			typeof corps !== "undefined" &&
			typeof isAdmin != "undefined" &&
			typeof isCorp != "undefined";
		if (hasInitialized) {
			setLoading(false);
		}
	}, [accessToken, corps, isAdmin, isCorp, setLoading]);
	return (
		<>
			<div className="h-[70px] fixed top-0 w-full flex flex-col justify-center items-center z-20">
				<div className="flex justify-between items-center h-[70%] w-[94%] rounded-full mx-auto bg-white py-3 px-5 border-2 border-gray-300">
					<div>{/* <Sun size={28} /> */}</div>
					<div className="flex flex-row-reverse justify-start items-center w-[50%] gap-8">
						{/* <CircleUserRound size={28} /> */}
						{loading ? (
							<>
								<Skeleton className="h-[20px] w-[40px] rounded-full" />
								<Skeleton className="h-[20px] w-[80px] rounded-full" />
								<Skeleton className="h-[20px] w-[120px] rounded-full" />
							</>
						) : (
							<>
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
									setLoading={setLoading}
									accessToken={accessToken}
									isCorp={isCorp}
									isAdmin={isAdmin}
								/>
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
							</>
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
					</div>
				</div>
			</div>
		</>
	);
}
