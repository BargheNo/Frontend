"use client"

import PanelAside from '@/components/PanelAside/PanelAside';
import { NavItem } from '@/src/types/PanelAsideTypes';
// import '../styles/globals.css';
import '@/styles/global.css';
import { Gauge, Layers, FilePlus, History, BarChart, MessageSquare, Calculator } from "lucide-react";

// const myFont = localFont({ src: '../..' })
  
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

    const navItems = [
        { name: "داشبورد", path: "/panel/dashboard", icon: <Gauge /> },
        { name: "پنل‌های من", path: "/panel/my-panels", icon: <Layers /> },
        { name: "ثبت سفارش", path: "/panel/new-order", icon: <FilePlus /> },
        { name: "سوابق تعمیرات", path: "/panel/repair-history", icon: <History /> },
        { name: "گزارشات", path: "/panel/reports", icon: <BarChart /> },
        { name: "پیام‌های من", path: "/panel/messages", icon: <MessageSquare /> },
        { name: "محاسبه‌گر", path: "/panel/calculator", icon: <Calculator /> },
    ];


  return (
    <PanelAside navItems={navItems as NavItem[]} >
      {children}
    </PanelAside>
  );
};