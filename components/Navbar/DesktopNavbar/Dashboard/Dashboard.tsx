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



export default function Dashboard({ setLoading, accessToken, isCorp, isAdmin }) {
	const pathname = usePathname();
	if (!accessToken) return <></>;
	if (!isCorp && !isAdmin)
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
								href={"/dashboard"}
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
										href={"/admin-dashboard"}
									>
										داشبورد ادمین
									</Link>
								)}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
