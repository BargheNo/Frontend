"use client"

import React from "react";
import IconWithBackground from "@/components/IconWithBackground/IconWithBackground";
import moment from "jalali-moment";
import { User, Calendar, MapPin, MoveLeft, Clock, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface CorpRepairCard {
    panelName: string,
    panelPower: number;
    status: "در انتظار تایید" | "تایید شده" | "رد شده" | "تمام شده";
    UrgencyLevel: "low" | "medium" | "high";
    address: string,
    date: string,
    owner: string,
    className: string,
    onDetailsClick?: () => void,
}

const CorpRepairCard = ({
        panelName,
        panelPower,
        status,
        UrgencyLevel,
        address,
        date,
        owner,
        className,
        onDetailsClick,
    }: CorpRepairCard) => {
    const getStatusIcon = () => {
        switch (status) {
            case "تمام شده":
                return <CheckCircle2 size={20} className="text-green-500" />;
            case "تایید شده":
                return <CheckCircle2 size={20} className="text-blue-500" />;
            case "در انتظار تایید":
                return <Clock size={20} className="text-yellow-500" />;
            case "رد شده":
                return <XCircle size={20} className="text-red-500" />;
            default:
                return <Clock size={20} className="text-gray-500" />;
        }
    };

    const getStatusText = () => {
        return status;
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

    return (
        <div
            className={`${className} w-full ${
                0 ? "h-64" : ""
            } border-b-1 border-gray-300`}
        >
            <div className="flex flex-col md:flex-row justify-between gap-6 w-full h-full bg-[#F0EDEF] p-5 overflow-hidden relative" dir="rtl">
                {/* Left Section: Panel Details */}
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
                                        {owner}
                                    </span>
                                </div>
                            </div>
                            <div className="flex">
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
                                        {moment(date.slice(0, 10), "YYYY-MM-DD").locale('fa').format('jYYYY/jMM/jDD')}
                                    </span>
                                </div>
                            </div>
                            <div className="flex">
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
                                        {address}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[30%] ">
                    {/* Right Section: Status and Action Button */}
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
                    <div className="w-full mt-2">
                        <div className="flex flex-row-reverse gap-2 justify-center items-center red-circle-button !rounded-2xl w-full" onClick={onDetailsClick}>
                            <button 
                                className="flex items-center justify-center md:red-circle-button"
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