"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import localFont from "next/font/local";

import { PanelAsideProps, NavItem } from "@/src/types/PanelAsideTypes";

// const myFont = localFont({ src: '../public/fonts/vazir/Vazir.ttf' })
const myFont = localFont({ src: "../../../public/fonts/vazir/Vazir.ttf" });

const PanelAside = ({
	children,
	navItems,
	mode = "customer",
}: PanelAsideProps) => {
	const pathname = usePathname();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768); // 768px is typical mobile breakpoint
		};

		// Check on mount
		checkMobile();

		// Add resize listener
		window.addEventListener("resize", checkMobile);

		// Cleanup
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	if (isMobile) {
		return <>{children}</>;
	}

	return (
		<div
			className={`flex fixed h-full w-full bg-[#F0EDEF] under-navbar-content ${myFont.className}`}
			dir="rtl"
		>
			{/* Sidebar */}
			{/* shadow-[-4px_-4px_5px_rgba(255,255,255,1),2px_2px_5px_rgba(0,0,0,0.3)] */}
			<aside
				className="w-64 bg-[#F0EDEF] text-white p-2 z-10
        "
			>
				<nav className="space-y-2">
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
			</aside>

			{/* Main Content */}
			<main className="no-scrollbar rounded-xl ml-3 flex-1 overflow-y-auto shadow-[inset_-4px_-4px_5px_rgba(255,255,255,1),inset_4px_4px_5px_rgba(0,0,0,0.3)] bg-white">
				{children}
			</main>
		</div>
	);
};

export default PanelAside;
