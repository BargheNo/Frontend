"use client";
import PanelAside from "@/components/Panel/PanelAside/PanelAside";
import {
	AdminNavItems,
	AdminNavItemsMonitoring,
} from "@/src/constants/navItems";
import "@/styles/global.css";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<PanelAside
			navItems={AdminNavItems}
			navItemsMonitoring={AdminNavItemsMonitoring}
			mode="admin"
		>
			{children}
		</PanelAside>
	);
}
