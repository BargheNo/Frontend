"use client"

import React, { useState } from "react";
import IconWithBackground from "@/components/IconWithBackground/IconWithBackground";
import Link from "next/link";
import moment from "jalali-moment";
import { User, Calendar, MapPin, MoveLeft, TextSearch, Move, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface CorpRepairCard {
    panelName: string,
    panelPower: number;
    // technicalDetails: {efficiency: number},
    // requestDetails,
    status: "pending" | "completed";
    UrgencyLevel: "low" | "medium" | "high";
    address: string,
    date: string,
    owner: string,
    className: string,
    onDetailsClick?: () => void,
};

const CorpRepairCard = ({
        panelName,
        panelPower,
        // requestDetails,
        status,
        UrgencyLevel,
        address,
        date,
        owner,
        className,
        onDetailsClick,
    }: CorpRepairCard) => {
    // TODO: Set types for this shit
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusIcon = () => {
        switch (status) {
            case "completed":
                return <CheckCircle2 size={20} className="text-green-500" />;
            case "pending":
                return <Clock size={20} className="text-yellow-500" />;
            default:
                return <Clock size={20} className="text-gray-500" />;
        }
    };

    const getStatusText = () => {
        switch (status) {
            case "completed":
                return "تکمیل شده";
            case "pending":
                return "در انتظار";
            default:
                return "نامشخص";
        }
    };

    const getUrgencyIcon = () => {
        switch (UrgencyLevel) {
            case "high":
                return <AlertCircle size={20} className="text-red-500" />;
            case "medium":
                return <AlertCircle size={20} className="text-yellow-500" />;
            case "low":
                return <AlertCircle size={20} className="text-green-500" />;
            default:
                return <AlertCircle size={20} className="text-gray-500" />;
        }
    };

    const getUrgencyText = () => {
        switch (UrgencyLevel) {
            case "high":
                return "زیاد";
            case "medium":
                return "متوسط";
            case "low":
                return "کم";
            default:
                return "نامشخص";
        }
    };

    const getStatusColor = () => {
        const efficiency = panelPower;
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
            } border-b-1 border-gray-300`}
        >
            <div className="flex flex-col md:flex-row justify-between gap-6 w-full h-full bg-[#F0EDEF] p-5 overflow-hidden relative" dir="rtl">
                {/* Left Section: Panel Details */}
                <div className="flex flex-col justify-between w-full md:w-2/3 z-10">
                    <div className="space-y-3 w-full">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {panelName}
                        </h2>
                        <div className="space-y-2 w-full">
                            <div className="flex flex-col gap-5">
                                <div className="flex text-sm text-gray-700 items-center">
                                    <div className="flex items-center">
                                        <IconWithBackground
                                            icon={User}
                                            color="#6B7280"
                                        />
                                        <span className="font-medium mr-2">
                                            مالک پنل:
                                        </span>
                                    </div>
                                    <div className="">
                                        <span className="mr-1 font-black">
                                            {
                                                owner
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="flex text-sm text-gray-700 items-center">
                                    <div className="flex items-center">
                                        <IconWithBackground
                                            icon={Calendar}
                                            color="#F59E0B"
                                        />
                                        <span className="font-medium mr-2">
                                            زمان تعمیر:
                                        </span>
                                    </div>
                                    <div className="">
                                        <span className="mr-1 font-black">
                                            {
                                                moment(date.slice(0, 10), "YYYY-MM-DD").locale('fa').format('YYYY/MM/DD')
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="flex text-sm text-gray-700 items-center">
                                    <div className="flex items-center">
                                        <IconWithBackground
                                            icon={MapPin}
                                            color="#F59E0B"
                                        />
                                        <span className="font-medium mr-2">
                                            آدرس:
                                        </span>
                                    </div>
                                    <div className="">
                                        <span className="mr-1 font-black">
                                            {
                                                address
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Section: Status and Action Button */}
                <div className="flex flex-col md:flex-row justify-between md:justify-around gap-4 w-full md:w-1/3 items-center z-10">
                    <div className="flex flex-col gap-4 w-full h-2/3">
                        <div className="flex flex-col items-center justify-center gap-2 p-3 inset-neu-container !h-full !w-full">
                            <div className="flex flex-col gap-2 text-sm font-black text-gray-800">
                                <div className="flex items-center gap-2">
                                    <span>وضعیت: {getStatusText()}</span>
                                    {getStatusIcon()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>ضرورت: {getUrgencyText()}</span>
                                    {getUrgencyIcon()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        {/* <Link href={`my-panels/123`}> */}
                        <div className="flex flex-row-reverse gap-2 justify-center items-center red-circle-button !rounded-2xl w-full" onClick={onDetailsClick}>
                            <button 
                                className="flex items-center justify-center md:red-circle-button"
                                // onClick={onDetailsClick}
                            >
                                <MoveLeft size={32} strokeWidth={1.5} />
                            </button>
                            <span className="text-sm">مشاهدۀ جزئیات</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CorpRepairCard;