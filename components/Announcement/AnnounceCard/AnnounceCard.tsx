"use client"
import { ContextMenu, ContextMenuItem, ContextMenuTrigger, ContextMenuContent } from "@/components/ui/context-menu"
import { cn } from "@/lib/utils";
import { Calendar, CircleCheckBig } from "lucide-react"
import { useState , useContext } from "react"
import { AnnounceContex } from "../AnnouncementBox/AnnouncementBox";
export default function AnnounceCard({title, content, writer, date}: {title: string, content: string, writer: string, date: number}) {
    const {selectMode, setSelectMode, incrementCount, decrementCount, selectedCount} = useContext(AnnounceContex)
    const [selected, setselected] = useState(false);

    const handleSelect = () => {
        const newSelected = !selected;
        setselected(newSelected);
        if (newSelected) {
            incrementCount();
        } else {
            decrementCount();
        }
    };

    return (
        <>
        <ContextMenu>
        <ContextMenuTrigger>
        <div
         className={cn(
            "",
            selected && "bg-gray-300 hover:bg-gray-300 py-2 rounded transition-all duration-300 ease-in-out relative",
            selectMode && "cursor-pointer")}
         onClick={() => {selectMode && handleSelect()}}
         >
        {/* <CircleCheckBig className={cn("opacity-0",selected &&"absolute top-2 left-2 cursor-pointer opacity-100 transition-all duration-1000 ease-in-out")} /> */}
        <div className={
            cn("flex flex-col gap-2 neo-card-rev  bg-white p-6 rounded-lg transition-all duration-300 ease-in-out",
            selected && "scale-95")}>
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div className="short-par">
                {content}
            </div>
            <div className="flex justify-between items-center">
                <div>نویسنده: {writer}</div>
                <div className="flex items-center gap-1">
                    <Calendar size={24} />
                    {new Date(date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                </div>
            </div>
        </div>
        </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="border-0 neo-card p-2 flex flex-col gap-2 rtl">
            <ContextMenuItem className="neo-btn" onClick={() => {
                setSelectMode(true);
                handleSelect();
            }}>
                انتخاب
            </ContextMenuItem>
            <ContextMenuItem className="neo-btn">
                ویرایش
            </ContextMenuItem>
            <ContextMenuItem className="neo-btn">
                حذف
            </ContextMenuItem>
        </ContextMenuContent>
        </ContextMenu>
        </>
    )
}
