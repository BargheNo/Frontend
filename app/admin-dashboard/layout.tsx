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
			RNPName: "user.viewAll",
			icon: <Users />,
		},

		{
			name: "نقش‌ها و دسترسی‌ها",
			path: "/admin-dashboard/roles-and-permissions",
			RNPName: "user.viewRoles",
			icon: <LaptopMinimalCheck />,
		},
		{
			name: "مدیریت شرکت‌ها",
			path: "/admin-dashboard/corp-management",
			RNPName: "corporation.viewAll",
			icon: <School />,
		},
		{
			name: "مدیریت سفارشات",
			path: "/admin-dashboard/manage-requests",
			RNPName: "installationRequest.viewAll",
			icon: <Package />,
		},
		// {
		// 	name: "مدیریت مالی",
		// 	path: "/admin-dashboard/finance",
		// 	icon: <DollarSign />,
		// },
		{
			name: "پشتیبانی",
			path: "/admin-dashboard/support",
			RNPName: "ticket.viewAll",
			icon: <Headset />,
		},
		{
			name: "بلاگ‌ها",
			path: "/admin-dashboard/blogs",
			RNPName: "adminBlog.viewAll",
			icon: <BookOpen />,
		},
		{
			name: "گزارشات",
			path: "/admin-dashboard/reports",
			RNPName: "report.viewAll",
			icon: <AlertCircle />,
		},
		{
			name: "اخبار و اطلاعیه‌ها",
			path: "/admin-dashboard/announcements",
			RNPName: "news.viewAll",
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
		{
			name: "پنل‌ها",
			path: "/admin-dashboard/panels",
			RNPName: "panel.viewAll",
			icon: <BarChart />,
		},
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
