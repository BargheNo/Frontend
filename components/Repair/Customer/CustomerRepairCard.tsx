"use client"

import React, { useState } from "react";
import { PanelCardProps } from "@/src/types/PanelCardTypes";
import IconWithBackground from "@/components/IconWithBackground/IconWithBackground";
import Link from "next/link";
import { Drill, Flag, CalendarCheck, ChevronDown, TextSearch } from "lucide-react";

const CustomerRepairCard = ({
        panelName,
        technicalDetails,
        // requestDetails,
        address,
        className,
    }: PanelCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusColor = () => {
        const efficiency = technicalDetails.efficiency;
        if (efficiency >= 80) return "green-status";
        if (efficiency >= 60) return "yellow-status";
        return "red-status";
    };

    const formatNumber = (num: number): string => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};


    const MAXLENGTH: number = 70;
    // Function to truncate text
    const truncateText = (text: string, maxLength: number = MAXLENGTH) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    return (
        <div
            className={`${className} w-full ${
                0 ? "h-64" : ""
            } border-t-1 border-gray-300 first:border-t-0`}
        >
            <div className="flex flex-row justify-between gap-6 w-full h-full bg-[#F0EDEF] p-5 overflow-hidden relative">
                {/* Left Section: Panel Details */}
                <div className="flex flex-col justify-between w-full z-10">
                    <div className="space-y-3 w-full">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {panelName}
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
                                            سرویس‌کار:
                                        </span>
                                    </div>
                                    <div className="">
                                        <span className="mr-1">
                                            {formatNumber(
                                                technicalDetails.capacity
                                            )}{" "}
                                            کیلووات
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
                                            تولید امروز:
                                        </span>
                                    </div>
                                    <div className="">
                                        <span className="mr-1">
                                            {formatNumber(
                                                technicalDetails.todayProduction
                                            )}{" "}
                                            کیلووات ساعت
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col text-sm text-gray-700 mt-6">
                        <div className={`mt-2 transition-all duration-200 ${isExpanded ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                            <span className="mr-1">{address}</span>
                        </div>
                        {!isExpanded && (
                            <div className="mt-2 text-gray-600">
                                <span className="mr-1">{truncateText(address)}</span>
                            </div>
                        )}
                        { address.length > MAXLENGTH && <div className="flex items-center text-gray-400 mt-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
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
                                {/* requestDetails.status */}
                                تکمیل شده
                            </span>
                        </div>
                    </div>
                    <div className="w-full">
                        {/* <Link href={`my-panels/123`}> */}
                        <div>
                            {/* Replace 123 with panelId later */}
                            <button className="flex items-center justify-center cta-neu-button !rounded-2xl">
                                <span className="text-md font-black">جزئیات</span>
                                <TextSearch strokeWidth={3} className="mr-2 w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerRepairCard;