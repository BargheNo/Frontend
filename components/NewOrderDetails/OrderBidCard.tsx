"use client";
import React, { useState } from "react";
import IconWithBackground from "../IconWithBackground/IconWithBackground";
import wordExpression from "@/src/functions/Calculations";
import {
    CircleDollarSign,
    Battery,
    DollarSign,
    ArrowLeft,
    CalendarRange,
    LandPlot,
    ShieldCheck,
    CreditCard,
} from "lucide-react";
import styles from "./styles.module.css";
import DateConverter from "@/src/functions/toJalali";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CancelButton from "../Dialog/CancelButton/CancelButton";
import { Button } from "../ui/button";
import { postData } from "@/src/services/apiHub";
import CustomToast from "../Custom/CustomToast/CustomToast";
import { BidFormProps } from "@/src/types/RequestCardTypes";
import LoadingOnButton from "../Loading/LoadinOnButton/LoadingOnButton";

interface Bid {
    id: number;
    description: string;
    cost: number;
    installationTime: string; // ISO date string
    status: string;
    area: number;
    power: number;
    paymentTerms: {
        id: number;
        paymentMethod: string;
    };
    guarantee: {
        id: number;
        name: string;
        status: string;
        guaranteeType: string;
        durationMonths: number;
        description: string;
        terms: string | null;
    };
}

export default function OrderBidCard({
    fetchBids,
    orderId,
    bid,
}: {
    fetchBids: any;
    orderId: string;
    bid: Bid;
}) {
    const [open, setOpen] = useState<boolean>(false);
    const [rejectLoading, setRejectLoading] = useState<boolean>(false);
    const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
    const getStatusColor = (status: string) => {
        if (status === "تایید شده") return "green-status";
        if (status === "در انتظار تایید") return "yellow-status";
        if (status === "رد شده") return "red-status";
        if (status === "منقضی شده") return "orange-status";
        if (status === "لغو شده") return "gray-status";
        return "gray-status";
    };
    const rejectBid = (bidId: number) => {
        setRejectLoading(true);
        postData({
            endPoint: `/v1/user/installation/request/${orderId}/bid/${bidId}/reject`,
        })
            .then((data) => {
                CustomToast(data?.message, "success");
                fetchBids();
                setOpen(false);
            })
            .catch((err) => console.log(err))
            .finally(() => setRejectLoading(false));
    };

    const acceptBid = (bidId: number) => {
        setAcceptLoading(true);
        postData({
            endPoint: `/v1/user/installation/request/${orderId}/bid/${bidId}/accept`,
        })
            .then((data) => {
                CustomToast(data?.message, "success");
                fetchBids();
                setOpen(false);
            })
            .catch((err) => console.log(err))
            .finally(() => setAcceptLoading(false));
    };
    return (
        <div
            className={`w-full min-h-64 border-t-1 border-gray-300 first:border-t-0`}
        >
            <div className="flex flex-row justify-between w-full min-h-64 bg-[#F0EDEF] overflow-hidden relative">
                <div className="flex md:flex-row flex-col justify-between w-full min-h-64">
                    <div className="w-4/5 flex flex-col justify-between p-4 h-full">
                        <Item
                            icon={Battery}
                            fieldName="ظرفیت پیشنهادی"
                            fieldValue={bid?.power}
                            prefix="W"
                            english={true}
                        />
                        <Item
                            icon={CalendarRange}
                            fieldName="زمان تخمینی نصب"
                            fieldValue={DateConverter(bid?.installationTime)}
                            english={true}
                        />
                        <Item
                            icon={DollarSign}
                            fieldName="قیمت پیشنهادی"
                            fieldValue={bid?.cost}
                            prefix="تومان"
                        />
                    </div>
                    <div className="flex md:flex-col flex-row justify-evenly w-1/5 items-center text-center md:-mr-0 mr-6 md:gap-0 gap-28 md:mb-0 mb-10">
                        <div className="text-nowrap flex flex-col  md:ml-2 ml-auto items-center justify-center gap-2 md:p-3 p-5 rounded-2xl bg-[#F0F0F3] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)] w-30">
                            <div
                                className={`h-4 w-4 rounded-full ${getStatusColor(
                                    bid?.status
                                )} shadow-md`}
                            />
                            <span className="text-sm font-medium text-gray-600">
                                {bid?.status}
                            </span>
                        </div>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <div className="flex flex-col items-center gap-2 md:mr-0 -mr-5 text-nowrap">
                                    <div className="bg-gradient-to-b from-[#EE4334] to-[#D73628] rounded-full w-16 h-16 flex items-center place-content-center text-white cursor-pointer shadow-md hover:shadow-lg transition duration-300 hover:scale-105">
                                        <ArrowLeft />
                                    </div>
                                    <span>مشاهده جزئیات</span>
                                </div>
                            </DialogTrigger>
                            <DialogContent
                                style={{
                                    backgroundColor: "#F1F4FC",
                                }}
                                className="w-full max-h-[90vh] no-scrollbar mx-auto overflow-auto rtl dialog-width"
                            >
                                <DialogHeader>
                                    <DialogTitle className="flex justify-center items-end font-bold mt-3.5">
                                        جزئیات پیشنهاد
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-2">
                                    <span className="text-lg font-bold place-self-start">
                                        مشخصات درخواست
                                    </span>
                                    <div className={styles.Box}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2">
                                            <DialogItem
                                                icon={CircleDollarSign}
                                                fieldName="حداکثر هزینه"
                                                fieldValue={bid?.cost}
                                                english={false}
                                                prefix=" تومان"
                                            />
                                            <DialogItem
                                                icon={Battery}
                                                fieldName="ظرفیت پیشنهادی"
                                                fieldValue={bid?.power}
                                                english={true}
                                                prefix="W"
                                            />
                                            <DialogItem
                                                icon={CalendarRange}
                                                fieldName="زمان تخمینی نصب"
                                                fieldValue={DateConverter(
                                                    bid?.installationTime
                                                )}
                                            />
                                            <DialogItem
                                                icon={LandPlot}
                                                fieldName="مساحت"
                                                fieldValue={bid?.area}
                                                prefix=" متر مربع"
                                            />
                                            <DialogItem
                                                icon={ShieldCheck}
                                                fieldName="گارانتی"
                                                fieldValue={
                                                    bid?.guarantee?.name ??
                                                    "بدون گارانتی"
                                                }
                                            />
                                            <DialogItem
                                                icon={CreditCard}
                                                fieldName="شرایط پرداخت"
                                                fieldValue={
                                                    bid?.paymentTerms
                                                        ?.paymentMethod
                                                }
                                            />
                                        </div>
                                    </div>
                                    <p>
                                        <span className="font-bold">
                                            توضیحات:{" "}
                                        </span>
                                        <span>{bid?.description}</span>
                                    </p>
                                </div>
                                {bid?.status === "در انتظار تایید" && (
                                    <DialogFooter className="flex justify-between w-full">
                                        <CancelButton />
                                        <div className="flex gap-2">
                                            <Button
                                                className="gradient-red w-full"
                                                onClick={() =>
                                                    rejectBid(bid?.id)
                                                }
                                            >
                                                {rejectLoading ? (
                                                    <LoadingOnButton />
                                                ) : (
                                                    <p className="w-full">
                                                        رد پیشنهاد
                                                    </p>
                                                )}
                                            </Button>
                                            <Button
                                                className="gradient-green w-full"
                                                onClick={() =>
                                                    acceptBid(bid?.id)
                                                }
                                            >
                                                {acceptLoading ? (
                                                    <LoadingOnButton />
                                                ) : (
                                                    <p className="w-full">
                                                        پذیرش پیشنهاد
                                                    </p>
                                                )}
                                            </Button>
                                        </div>
                                    </DialogFooter>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Item = ({
    icon: Icon,
    fieldName,
    fieldValue,
    smallValue = false,
    prefix,
    english = false,
}: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    fieldName: string;
    fieldValue: string | number;
    smallValue?: boolean;
    prefix?: string;
    english?: boolean;
}) => {
    const { value, changed } = wordExpression(fieldValue, english);
    return (
        <div className="flex my-2 h-full gap-3 place-items-center">
            <div className="flex items-start">
                <IconWithBackground icon={Icon} />
            </div>
            <div className="flex flex-col sm:flex-row gap-1 items-start">
                <span
                    className={`text-nowrap ${
                        smallValue ? "text-xl" : "text-xl mt-[2px]"
                    }`}
                >
                    {fieldName}:{" "}
                </span>
                <span
                    dir={english ? "ltr" : "rtl"}
                    className={`text-black ${
                        smallValue ? "mt-[3px]" : "font-bold md:text-xl text-l"
                    }`}
                >
                    {value}
                    {changed && english ? "" : " "}
                    {prefix}
                </span>
            </div>
        </div>
    );
};

const DialogItem = ({
    icon: Icon,
    fieldName,
    fieldValue,
    english = false,
    prefix,
    className,
}: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    fieldName: string;
    fieldValue: string | number;
    english?: boolean;
    prefix?: string;
    className?: string;
}) => {
    const { value, changed } = wordExpression(fieldValue, english);
    return (
        <div
            className={`flex items-start gap-2 border-t-2 first:border-t-0 sm:[*:nth-child(2)]:border-t-0 border-gray-300 w-full py-2 ${className}`}
        >
            <Icon className="min-w-6 min-h-6 transition-transform duration-200 hover:scale-115 text-[#FA682D]" />
            <div className="flex gap-1">
                <span>{fieldName}: </span>
                <span className="text-[#5E5E5E]">
                    {value}
                    {changed && english ? "" : " "}
                    {prefix}
                </span>
            </div>
        </div>
    );
};
