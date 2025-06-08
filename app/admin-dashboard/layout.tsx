"use client";

import PanelAside from "@/components/Panel/PanelAside/PanelAside";
import { NavItem } from "@/src/types/PanelAsideTypes";
import "@/styles/global.css";
import {
  Users,
  Gauge,
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
} from "lucide-react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const navItems = [
    // { name: "داشبورد", path: "/admin-dashboard/dashboard", icon: <Gauge /> },
    {
      name: "مدیریت کاربران",
      path: "/admin-dashboard/manage-users",
      icon: <Users />,
    },
    {
      name: "نقش‌ها و دسترسی‌ها",
      path: "/admin-dashboard/roles-and-permissions",
      icon: <LaptopMinimalCheck />,
    },
    {
      name: "مدیریت سفارشات",
      path: "/admin-dashboard/manage-requests",
      icon: <Package />,
    },
    {
      name: "مدیریت مالی",
      path: "/admin-dashboard/finance",
      icon: <DollarSign />,
    },
    { name: "پشتیبانی", path: "/admin-dashboard/support", icon: <Headset /> },
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
    { name: "پیشنهادات", path: "/admin-dashboard/bids", icon: <FilePlus /> },
    {
      name: "تعمیرات",
      path: "/admin-dashboard/maintenance",
      icon: <History />,
    },
    { name: "پنل ها", path: "/admin-dashboard/panels", icon: <BarChart /> },
    {
      name: "کارکنان شرکت",
      path: "/admin-dashboard/corp-staff",
      icon: <MessageSquare />,
    },
  ];
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
