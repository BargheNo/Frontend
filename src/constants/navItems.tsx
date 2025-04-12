import {
  Layers,
  FilePlus,
  History,
  BarChart,
  MessageSquare,
  Calculator,
} from "lucide-react";
import { NavItem } from "@/src/types/PanelAsideTypes";

export const navItems: NavItem[] = [
  { name: "پنل‌های من", path: "/dashboard/my-panels", icon: <Layers /> },
  { name: "ثبت سفارش", path: "/dashboard/new-order", icon: <FilePlus /> },
  {
    name: "سوابق تعمیرات",
    path: "/dashboard/repair-history",
    icon: <History />,
  },
  { name: "گزارشات", path: "/dashboard/reports", icon: <BarChart /> },
  { name: "پیام‌های من", path: "/dashboard/messages", icon: <MessageSquare /> },
  { name: "محاسبه‌گر", path: "/dashboard/calculator", icon: <Calculator /> },
];
