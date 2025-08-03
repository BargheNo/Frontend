import {
	Layers,
	FilePlus,
	BarChart,
	MessageSquare,
	Calculator,
	Headset,
	Megaphone,
	User,
	Wrench,
} from "lucide-react";
import { NavItem } from "@/src/types/PanelAsideTypes";

export const navItems: NavItem[] = [
	{
		name: "پروفایل کاربری",
		path: "/dashboard/profile",
		icon: <User />,
	},
	{ name: "پنل‌های من", path: "/dashboard/my-panels", icon: <Layers /> },
	{ name: "ثبت سفارش", path: "/dashboard/new-order", icon: <FilePlus /> },
	{ name: "محاسبه‌گر", path: "/dashboard/calculator", icon: <Calculator /> },
	{ name: "گزارشات", path: "/dashboard/reports", icon: <BarChart /> },
	{
		name: "پیام‌های من",
		path: "/dashboard/messages",
		icon: <MessageSquare />,
	},
	{
		name: "سوابق تعمیرات",
		path: "/dashboard/repair-history",
		icon: <Wrench />,
	},
	{
		name: "اخبار و اطلاعیه‌ها",
		path: "/dashboard/announcements",
		icon: <Megaphone />,
	},
	{ name: "پشتیبانی", path: "/dashboard/tickets", icon: <Headset /> },
];
