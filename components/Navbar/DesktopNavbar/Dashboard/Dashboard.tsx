"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { vazirBold } from "@/lib/fonts";
import React, { useEffect } from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useSelector } from "react-redux";
import hasPermission from "@/src/functions/hasPermission";



export default function Dashboard({ setLoading, accessToken, isCorp, isAdmin }) {
	// const corps = useSelector((state: RootState) => state).user.corps ?? [];
	// const accessToken = useSelector((state: RootState) => state).user
	// 	.accessToken;
	// const isAdmin = adminPermissions
	// 	.map((adminPermission) => hasPermission(adminPermission))
	// 	.some((value) => value === true);
	// const isCorp = corps?.length > 0;
	// const hasInitialized =
	// 	typeof accessToken !== "undefined" &&
	// 	typeof corps !== "undefined" &&
	// 	typeof isAdmin != "undefined" &&
	// 	typeof isCorp != "undefined";
	// if (hasInitialized) {
	// 	setLoading(false);
	// }
	// useEffect(() => {
	// 	// console.log(
	// 	// 	"hi",
	// 	// 	typeof accessToken !== "undefined",
	// 	// 	typeof corps !== "undefined",
	// 	// 	typeof isAdmin != "undefined",
	// 	// 	typeof isCorp != "undefined",
	// 	// 	"hi"
	// 	// );
	// 	// const hasInitialized =
	// 	// 	typeof accessToken !== "undefined" &&
	// 	// 	typeof corps !== "undefined" &&
	// 	// 	typeof isAdmin != "undefined" &&
	// 	// 	typeof isCorp != "undefined";
	// 	// if (hasInitialized) {
	// 	// 	setLoading(false);
	// 	// }
	// }, [accessToken, corps, isAdmin, isCorp, setLoading]);
	const pathname = usePathname();
	if (!accessToken) return <></>;
	if (!isCorp && !isAdmin)
		return (
			<Link
				className={`${[
					pathname?.startsWith("/dashboard") ? "text-[#FA682D]" : "",
					vazirBold.className,
				].join(" ")}`}
				href={"/corpdashboard/installed-panels"}
			>
				داشبورد
			</Link>
		);
	return (
		<div>
			<NavigationMenu viewport={true}>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>
							<Link
								className={`${[
									pathname?.startsWith("/corpdashboard") ||
									pathname?.startsWith("/dashboard") ||
									pathname?.startsWith("/admin-dashboard")
										? "text-[#FA682D]"
										: "",
									vazirBold.className,
								].join(" ")}`}
								href={"/corpdashboard/installed-panels"}
							>
								داشبورد
							</Link>
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[200px] gap-2 rtl vazir">
								<Link
									className={`${
										pathname?.startsWith("/dashboard")
											? "text-[#FA682D]"
											: ""
									} hover:cursor-pointer hover:bg-accent/50 rounded-lg p-1`}
									href={"/dashboard/my-panels"}
								>
									داشبورد
								</Link>
								{isCorp && (
									<Link
										className={`${
											pathname?.startsWith(
												"/corpdashboard"
											)
												? "text-[#FA682D]"
												: ""
										} hover:cursor-pointer hover:bg-accent/50 rounded-lg p-1`}
										href={"/corpdashboard/installed-panels"}
									>
										داشبورد شرکت
									</Link>
								)}
								{isAdmin && (
									<Link
										className={`${
											pathname?.startsWith(
												"/admin-dashboard"
											)
												? "text-[#FA682D]"
												: ""
										} hover:cursor-pointer hover:bg-accent/50 rounded-lg p-1`}
										href={"/admin-dashboard/manage-users"}
									>
										داشبورد ادمین
									</Link>
								)}
								{/* <li className="hover:cursor-pointer hover:bg-accent/50 rounded-lg p-1">
									داشبورد
								</li>
								<li className="hover:cursor-pointer hover:bg-accent/50 rounded-lg p-1">
									داشبورد شرکت
								</li>
								<li className="hover:cursor-pointer hover:bg-accent/50 rounded-lg p-1">
									داشبورد ادمین
								</li> */}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
