import {
  Layers,
  FilePlus,
  History,
  BarChart,
  MessageSquare,
  Calculator,
  Headset,
  Megaphone,
  Server,
  ClipboardList,
  SquarePen,
  Wrench,
  Send,
  LaptopMinimalCheck,
  Package,
  DollarSign,
  BookOpen,
  AlertCircle,
  Users,
} from "lucide-react";
import { NavItem } from "@/src/types/PanelAsideTypes";

export const UserNavItems: NavItem[] = [
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
  { name: "پشتیبانی", path: "/dashboard/tickets", icon: <Headset /> },
  {
    name: "اخبار و اطلاعیه‌ها",
    path: "/dashboard/announcements",
    icon: <Megaphone />,
  },
];

export const CorpNavItems = [
  // { name: "داشبورد", path: "/dashboard/dashboard", icon: <Gauge /> },
  {
    name: "پنل‌های نصب شده",
    path: "/corpdashboard/installed-panels",
    icon: <Server />,
  },
  { name: "پیشنهادهای ارسال شده", path: "/corpdashboard/bids", icon: <Send /> },
  {
    name: "درخواست‌ها",
    path: "/corpdashboard/requests",
    icon: <ClipboardList />,
  },
  {
    name: "تکمیل و ویرایش اطلاعات",
    path: "/corpdashboard/editprofile",
    icon: <SquarePen />,
  },
  {
    name: "پیام‌های من",
    path: "/corpdashboard/messages",
    icon: <MessageSquare />,
  },
  {
    name: "تعمیرات پیش رو",
    path: "/corpdashboard/maintenances",
    icon: <Wrench />,
  },
  { name: "گزارشات", path: "/corpdashboard/reports", icon: <BarChart /> },
  { name: "تکنسین‌ها", path: "/corpdashboard/technicians", icon: <Users /> },
  {
    name: "اخبار و اطلاعیه‌ها",
    path: "/corpdashboard/announcements",
    icon: <Megaphone />,
  },
];

export const AdminNavItems = [
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
  { name: "گزارشات", path: "/admin-dashboard/reports", icon: <AlertCircle /> },
  {
    name: "اخبار و اطلاعیه‌ها",
    path: "/admin-dashboard/announcements",
    icon: <Megaphone />,
  },
];
