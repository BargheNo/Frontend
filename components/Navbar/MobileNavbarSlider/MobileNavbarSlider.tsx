import { SidebarContent } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/ui/sidebar";
import { NavItem } from "@/src/types/PanelAsideTypes";
import { PanelAsideProps } from "@/src/types/PanelAsideTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MobileNavbarSlider({
	navItems,
	mode,
}: PanelAsideProps) {
	const pathname = usePathname();
	return (
		<Sidebar side="right">
			<SidebarContent className="neo-card! bg-[#F0EDEF]!">
				<div className="flex flex-col items-start gap-4 p-4 w-full rtl">
					<h2 className="text-xl font-semibold">منو</h2>

					<nav className="space-y-2 w-full">
						{navItems.map((item: NavItem) => (
							<Link key={item.path} href={item.path}>
								<span
									className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-pointer ${
										pathname === item.path
											? `shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] bg-gradient-to-r ${
													mode === "customer"
														? "from-[#A55FDA] to-[#F37240]"
														: mode === "corp"
														? "from-[#2979FF] to-[#1b6cf5]"
														: "from-[#FF5B18] to-[#FF6809]"
											  } text-white`
											: "hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200"
									}`}
								>
									{item.icon}
									{item.name}
								</span>
							</Link>
						))}
					</nav>
				</div>
			</SidebarContent>
		</Sidebar>
	);
}
