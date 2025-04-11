"use client"

import React, { useState } from "react";
import IconWithBackground from "@/components/IconWithBackground/IconWithBackground";
import { Drill, CalendarCheck, ChevronDown, TextSearch } from "lucide-react";

interface RepairHistoryItem {
    title: string;
    panelName: string;
    panelId: string;
    repairMan: string;
    date: string;
    notes: string;
    status: string;
}

interface CustomerRepairCardProps {
    repairItem: RepairHistoryItem;
    className?: string;
    onDetailsClick?: () => void;
}

const CustomerRepairCard = ({
    repairItem,
    className,
    onDetailsClick,
}: CustomerRepairCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusColor = () => {
        if (repairItem.status === "done") return "green-status";
        if (repairItem.status === "in_progress") return "yellow-status";
        return "red-status";
    };

    const MAXLENGTH: number = 70;
    const truncateText = (text: string, maxLength: number = MAXLENGTH) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    return (
        <div
            className={`${className} w-full border-t-1 border-gray-300 first:border-t-0`}
        >
            <div className="flex flex-row justify-between gap-6 w-full h-full bg-[#F0EDEF] p-5 overflow-hidden relative">
                {/* Left Section: Repair Details */}
                <div className="flex flex-col justify-between w-full z-10">
                    <div className="space-y-3 w-full">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {repairItem.title}
                        </h2>
                        <div className="space-y-2 w-full">
                            <div className="flex gap-36">
                                <div className="flex text-sm text-gray-700 justify-between items-center">
                                    <div className="flex items-center w-1/2">
                                        <IconWithBackground
                                            icon={Drill}
                                            color="#6B7280"
                                        />
                                        <span className="font-medium mr-2">
                                            تعمیرکار:
                                        </span>
                                    </div>
                                    <div className="">
                                        <span className="mr-1">
                                            {repairItem.repairMan}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex text-sm text-gray-700 justify-between items-center">
                                    <div className="flex items-center">
                                        <IconWithBackground
                                            icon={CalendarCheck}
                                            color="#F59E0B"
                                        />
                                        <span className="font-medium mr-2">
                                            تاریخ:
                                        </span>
                                    </div>
                                    <div className="">
                                        <span className="mr-1">
                                            {repairItem.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-sm text-gray-700 mt-6">
                        <div className={`mt-2 transition-all duration-200 ${isExpanded ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                            <span className="mr-1">{repairItem.notes}</span>
                        </div>
                        {!isExpanded && (
                            <div className="mt-2 text-gray-600">
                                <span className="mr-1">{truncateText(repairItem.notes)}</span>
                            </div>
                        )}
                        { repairItem.notes.length > MAXLENGTH && <div className="flex items-center text-gray-400 mt-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                            <span className="font-medium">بیشتر</span>
                            <ChevronDown 
                                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            />
                        </div>}
                    </div>
                </div>

                {/* Right Section: Status and Action Button */}
                <div className="flex flex-col justify-around gap-4 items-center z-10 min-w-36">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-row-reverse items-center justify-center gap-2 p-3 inset-neu-container !w-full">
                            <div
                                className={`h-4 w-4 rounded-full ${getStatusColor()} shadow-md`}
                            ></div>
                            <span className="text-sm font-black text-gray-800">
                                {repairItem.status === "done" ? "تکمیل شده" : 
                                 repairItem.status === "in_progress" ? "در حال انجام" : "در انتظار"}
                            </span>
                        </div>
                    </div>
                    <div className="w-full">
                        <button 
                            className="flex items-center justify-center cta-neu-button !rounded-2xl"
                            onClick={onDetailsClick}
                        >
                            <span className="text-md font-black">جزئیات</span>
                            <TextSearch strokeWidth={3} className="mr-2 w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerRepairCard;