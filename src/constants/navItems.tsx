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
    School,
    ShieldCheck,
    User,
    Mail,
} from "lucide-react";
import { NavItem } from "@/src/types/PanelAsideTypes";

export const UserNavItems: NavItem[] = [
    {
        name: "پروفایل کاربری",
        path: "/dashboard/profile",
        icon: <User />,
    },
    { name: "پنل‌های من", path: "/dashboard/my-panels", icon: <Layers /> },
    { name: "ثبت سفارش", path: "/dashboard/new-order", icon: <FilePlus /> },
    { name: "محاسبه‌گر", path: "/dashboard/calculator", icon: <Calculator /> },
    // { name: "گزارشات", path: "/dashboard/reports", icon: <BarChart /> },
    // {
    //     name: "پیام‌های من",
    //     path: "/dashboard/messages",
    //     icon: <MessageSquare />,
    // },
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
    { name: "بلاگ‌ها", path: "/dashboard/blogs", icon: <BookOpen /> },
    { name: "پشتیبانی", path: "/dashboard/tickets", icon: <Headset /> },
    { name: "مکالمات", path: "/dashboard/chats", icon: <Mail /> },
];

export const CorpNavItems = [
    {
        name: "تکمیل و ویرایش اطلاعات",
        path: "/corpdashboard/editprofile",
        icon: <SquarePen />,
    },
    {
        name: "پنل‌های نصب شده",
        path: "/corpdashboard/installed-panels",
        icon: <Server />,
    },
    {
        name: "پیشنهادهای ارسال شده",
        path: "/corpdashboard/bids",
        RNPName: "bid.viewAll",
        icon: <Send />,
    },
    {
        name: "درخواست‌ها",
        path: "/corpdashboard/requests",
        RNPName: "bid.viewInstallationRequests",
        icon: <ClipboardList />,
    },
    // { name: "گزارشات", path: "/corpdashboard/reports", icon: <BarChart /> },
    // {
    //     name: "پیام‌های من",
    //     path: "/corpdashboard/messages",
    //     icon: <MessageSquare />,
    // },
    {
        name: "تعمیرات پیش رو",
        path: "/corpdashboard/maintenances",
        RNPName: "maintenance.viewAll",
        icon: <Wrench />,
    },
    {
        name: "اخبار و اطلاعیه‌ها",
        path: "/corpdashboard/announcements",
        icon: <Megaphone />,
    },
    { name: "بلاگ‌ها", path: "/corpdashboard/blogs", icon: <BookOpen /> },
    {
        name: "اعضای شرکت",
        path: "/corpdashboard/staff",
        icon: <Users />,
    },
    {
        name: "گارانتی",
        path: "/corpdashboard/warranties",
        RNPName: "guarantee.viewAll",
        icon: <ShieldCheck />,
    },
    {
        name: "مکالمات",
        path: "/corpdashboard/chats",
        icon: <Mail />,
    },
];

export const AdminNavItems = [
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
    // {
    // 	name: "مدیریت سفارشات",
    // 	path: "/admin-dashboard/manage-requests",
    // 	RNPName: "installationRequest.viewAll",
    // 	icon: <Package />,
    // },
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
    {
        name: "بلاگ‌ها",
        path: "/admin-dashboard/blogs",
        RNPName: "adminBlog.viewAll",
        icon: <BookOpen />,
    },
];

export const AdminNavItemsMonitoring: NavItem[] = [
    {
        name: "سفارشات",
        path: "/admin-dashboard/entity-monitoring/orders",
        icon: <Layers />,
    },
    {
        name: "پیشنهادات",
        path: "/admin-dashboard/entity-monitoring/bids",
        icon: <FilePlus />,
    },
    {
        name: "تعمیرات",
        path: "/admin-dashboard/entity-monitoring/maintenance",
        icon: <History />,
    },
    {
        name: "پنل‌ها",
        path: "/admin-dashboard/entity-monitoring/panels",
        RNPName: "panel.viewAll",
        icon: <BarChart />,
    },
    {
        name: "کارکنان شرکت",
        path: "/admin-dashboard/entity-monitoring/corp-staff",

        icon: <MessageSquare />,
    },
];
