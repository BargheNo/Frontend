"use client"

import PanelAside from '@/components/Panel/PanelAside/PanelAside';
import { NavItem } from '@/src/types/PanelAsideTypes';
// import '../styles/globals.css';
import '@/styles/global.css';
import { Layers, FilePlus, History, BarChart, MessageSquare, Calculator } from "lucide-react";

// const myFont = localFont({ src: '../..' })
  
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

    const navItems = [
        // { name: "داشبورد", path: "/dashboard/dashboard", icon: <Gauge /> },
        { name: "پنل‌های من", path: "/dashboard/my-panels", icon: <Layers /> },
        { name: "ثبت سفارش", path: "/dashboard/new-order", icon: <FilePlus /> },
        { name: "سوابق تعمیرات", path: "/dashboard/repair-history", icon: <History /> },
        { name: "گزارشات", path: "/dashboard/reports", icon: <BarChart /> },
        { name: "پیام‌های من", path: "/dashboard/messages", icon: <MessageSquare /> },
        { name: "محاسبه‌گر", path: "/dashboard/calculator", icon: <Calculator /> },
    ];


  return (
    <PanelAside navItems={navItems as NavItem[]}>
      {children}
    </PanelAside>
  );
};