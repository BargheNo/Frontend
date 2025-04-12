import React from 'react'

import Link from "next/link";
import { usePathname } from "next/navigation";

import localFont from 'next/font/local'

import { PanelAsideProps, NavItem } from "@/src/types/PanelAsideTypes";

const myFont = localFont({ src: '../../public/fonts/vazir/Vazir.ttf' })

const PanelAside = ({ children, navItems }: PanelAsideProps) => {
  const pathname = usePathname();
  
  return (    
    <div className={`flex fixed h-full w-full bg-[#E8EBF2] bg-[#e7e4e6] ${myFont.className}`} dir='rtl'>
        {/* Sidebar */}
        <aside className="w-64 bg-[#E8EBF2] bg-[#F0EDEF] text-white p-2 z-10
        shadow-[-4px_-4px_10px_rgba(255,255,255,1),2px_2px_5px_rgba(0,0,0,0.3)]
        "
        >
        <nav className="space-y-2">
            {navItems.map((item: NavItem) => (
            <Link key={item.path} href={item.path}>
                <span
                className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-pointer ${
                    pathname === item.path ? "shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] bg-gradient-to-r from-[#2979FF] to-[#1b6cf5] text-white" : "hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200"
                }`}
                >
                {item.icon}
                {item.name}
                </span>
            </Link>
            ))}
        </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}

export default PanelAside