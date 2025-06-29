"use client";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import PanelAside from "@/components/Panel/PanelAside/PanelAside";
import hasAdminAnyPermission from "@/src/functions/isAdmin";
import { NavItem } from "@/src/types/PanelAsideTypes";
import "@/styles/global.css";
import {
	Users,
	Package,
	DollarSign,
	Headset,
	BookOpen,
	Megaphone,
	AlertCircle,
	LaptopMinimalCheck,
	History,
	Layers,
	FilePlus,
	BarChart,
	MessageSquare,
	School,
} from "lucide-react";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const navItems = [
		{
			name: "مدیریت کاربران",
			path: "/admin-dashboard/manage-users",
			RNPName: "user.view_all",
			icon: <Users />,
		},

		{
			name: "نقش‌ها و دسترسی‌ها",
			path: "/admin-dashboard/roles-and-permissions",
			RNPName: "user.manage_roles_permissions",
			icon: <LaptopMinimalCheck />,
		},
		{
			name: "مدیریت شرکت‌ها",
			path: "/admin-dashboard/corp-management",
			RNPName: "corporation.view_all",
			icon: <School />,
		},
		{
			name: "مدیریت سفارشات",
			path: "/admin-dashboard/manage-requests",
			RNPName: "installation_request.view_all",
			icon: <Package />,
		},
		{
			name: "مدیریت مالی",
			path: "/admin-dashboard/finance",
			icon: <DollarSign />,
		},
		{
			name: "پشتیبانی",
			path: "/admin-dashboard/support",
			icon: <Headset />,
		},
		{ name: "بلاگ‌ها", path: "/admin-dashboard/blogs", icon: <BookOpen /> },
		{
			name: "گزارشات",
			path: "/admin-dashboard/reports",
			icon: <AlertCircle />,
		},
		{
			name: "اخبار و اطلاعیه‌ها",
			path: "/admin-dashboard/announcements",
			icon: <Megaphone />,
		},
	];
	const navItemsMonitoring: NavItem[] = [
		{ name: "سفارشات", path: "/admin-dashboard/orders", icon: <Layers /> },
		{
			name: "پیشنهادات",
			path: "/admin-dashboard/bids",
			icon: <FilePlus />,
		},
		{
			name: "تعمیرات",
			path: "/admin-dashboard/maintenance",
			icon: <History />,
		},
		{ name: "پنل‌ها", path: "/admin-dashboard/panels", icon: <BarChart /> },
		{
			name: "کارکنان شرکت",
			path: "/admin-dashboard/corp-staff",
			icon: <MessageSquare />,
		},
	];
	// const isAdmin = hasAdminAnyPermission();
	// if (!isAdmin) {
	// 	window.location.href = "/";
	// }
	return (
		<PanelAside
			navItems={navItems as NavItem[]}
			navItemsMonitoring={navItemsMonitoring}
			mode="admin"
		>
			{children}
		</PanelAside>
	);
}
