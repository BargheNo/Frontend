"use client";

import PanelAside from "@/components/Panel/PanelAside/PanelAside";
import { getData } from "@/src/services/apiHub";
import { setCorp } from "@/src/store/slices/corpSlice";
import { setCorpId, setUser } from "@/src/store/slices/userSlice";
import { NavItem } from "@/src/types/PanelAsideTypes";
// import '../styles/globals.css';
import "@/styles/global.css";
import {
  Server,
  Send,
  ClipboardList,
  SquarePen,
  MessageSquare,
  Wrench,
  BarChart,
  Users,
  Megaphone,
  ShieldCheck,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// const myFont = localFont({ src: '../..' })

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useDispatch();
  const navItems = [
    // { name: "داشبورد", path: "/dashboard/dashboard", icon: <Gauge /> },
    {
      name: "پنل‌های نصب شده",
      path: "/corpdashboard/installed-panels",
      icon: <Server />,
    },
    {
      name: "پیشنهادهای ارسال شده",
      path: "/corpdashboard/bids",
      icon: <Send />,
    },
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
    {
      name: "گارانتی",
      path: "/corpdashboard/warranties",
      icon: <ShieldCheck />
    }
  ];

  useEffect(() => {
    getData({ endPoint: `/v1/user/corps` })
      .then((res) => {
        const corpId = res?.data[0]?.id
        console.log("corpId", corpId, res);
        dispatch(setCorpId(corpId));
      })
  }, []);
  return (
    <PanelAside navItems={navItems as NavItem[]} mode="corp">
      {children}
    </PanelAside>
  );
}
