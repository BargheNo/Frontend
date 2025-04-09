"use client"

import PanelAside from '@/components/Panel/PanelAside/PanelAside';
import { NavItem } from '@/src/types/PanelAsideTypes';
import '@/styles/global.css';
import { Users, Gauge, Package, DollarSign, Headset, BookOpen, Megaphone } from "lucide-react";
  
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const navItems = [
        { name: "داشبورد", path: "/admin-dashboard/dashboard", icon: <Gauge /> },
        { name: "مدیریت کاربران", path: "/admin-dashboard/manage-users", icon: <Users /> },
        { name: "مدیریت سفارشات", path: "/admin-dashboard/manage-requests", icon: <Package /> },
        { name: "مدیریت مالی", path: "/admin-dashboard/finance", icon: <DollarSign /> },
        { name: "پشتیبانی", path: "/admin-dashboard/support", icon: <Headset /> },
        { name: "بلاگ‌ها", path: "/admin-dashboard/blogs", icon: <BookOpen /> },
        { name: "اخبار و اطلاعیه‌ها", path: "/admin-dashboard/news", icon: <Megaphone /> },
    ];
  return (
    <PanelAside navItems={navItems as NavItem[]} mode="admin" >
      {children}
    </PanelAside>
  );
};