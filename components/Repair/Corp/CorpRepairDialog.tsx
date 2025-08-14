"use client";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { baseURL, getData, putData } from "@/src/services/apiHub";
import { CorpRepairDialogProps, MaintenanceRecord } from "@/types/CorpTypes";
import RepairHistory from "./RepairHistory";
import RepairForm from "./RepairForm";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import useHasPermission from "@/src/functions/hasPermission";
import { useSelector } from "react-redux";

interface RepairHistoryProps {
    id: string;
    operator: {
        firstName: string;
        lastName: string;
    };
    createdAt: string;
    title: string;
    details: string;
    violation?: {
        reason: string;
        details: string;
    };
}

const CorpRepairDialog = ({
    isOpen,
    onClose,
    repairItem,
    onDataChange,
}: CorpRepairDialogProps) => {
    const {
        hasPermission: hasAcceptMaintenanceRequestPermission,
        loading: permissionLoading,
    } = useHasPermission("maintenance.acceptRequest");
    const corpId = useSelector((state: RootState) => state.user.corpId);
    // const [notes, setNotes] = useState<MaintenanceRecord[] | null>(null);
    const [notes, setNotes] = useState<RepairHistoryProps | null>(null);
    const [isLoadingNotes, setIsLoadingNotes] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        if (repairItem) {
            getData({
                endPoint: `${baseURL}/v1/corp/${corpId}/maintenance/request/${repairItem.id}`,
            })
                .then((res) => {
                    setNotes(res.data.record);
                    setIsLoadingNotes(false);
                })
                .catch((err) => {
                    console.log(err);
                    // CustomToast("خطا در دریافت یادداشت‌‌های پنل", "error");
                    setIsLoadingNotes(false);
                });
        }
    }, [repairItem, corpId]);

    if (!repairItem) return null;

    const handleAccept = async () => {
        setIsLoading(true);
        putData({
            endPoint: `${baseURL}/v1/corp/${corpId}/maintenance/request/${repairItem.id}/accept`,
        })
            .then((res) => {
                CustomToast(res?.message, "success");
                onDataChange?.(); // Refresh the data
                onClose();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleReject = async () => {
        setIsLoading(true);
        putData({
            endPoint: `${baseURL}/v1/corp/${corpId}/maintenance/request/${repairItem.id}/reject`, // TODO: corpIDDDDDDDD
        })
            .then((res) => {
                CustomToast(res?.message, "success");
                onDataChange?.(); // Refresh the data
                onClose();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                style={{ backgroundColor: "#FEFEFE" }}
                className="min-w-[57vw] max-h-[80vh] dialog-width"
            >
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-end font-bold mt-3.5">
                        جزئیات تعمیرات
                    </DialogTitle>
                </DialogHeader>

                <div className="overflow-y-auto max-h-[calc(80vh-100px)] pr-2 no-scrollbar">
                    <div dir="rtl" className="flex flex-col gap-5">
                        {isLoadingNotes ? (
                            <LoadingSpinner />
                        ) : notes && (notes.title || notes.details || notes.violation?.details || notes.violation?.reason) ? (
                            <RepairHistory note={notes} />
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-4 py-8">
                                <div className="text-6xl text-gray-400 font-bold">
                                    !
                                </div>
                                <p className="text-gray-500">
                                    هیچ یادداشتی ثبت نشده است
                                </p>
                            </div>
                        )}
                        <div className="flex flex-col gap-2 justify-center items-center inset-neu-container !w-full !p-5 !bg-gray-50">
                            <h4 className="text-lg self-start font-semibold text-navy-blue">
                                جزئیات تعمیر
                            </h4>
                            <span className="self-start">
                                {repairItem.description}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4">
                            {hasAcceptMaintenanceRequestPermission &&
                                repairItem.status === "در انتظار تایید" && (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-700"
                                            onClick={handleReject}
                                            disabled={isLoading}
                                        >
                                            <XCircle size={20} />
                                            رد درخواست
                                        </Button>
                                        <Button
                                            className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700"
                                            onClick={handleAccept}
                                            disabled={isLoading}
                                        >
                                            <CheckCircle size={20} />
                                            تایید درخواست
                                        </Button>
                                    </>
                                )}
                            {repairItem.status === "تایید شده" && (
                                <Button
                                    onClick={() => setIsFormOpen(true)}
                                    className="red-circle-button mx-2 p-2 w-fit"
                                >
                                    افزودن یادداشت
                                </Button>
                            )}
                        </div>

                        {/* Repair Form */}
                        {isFormOpen && (
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <RepairForm
                                    panelId={repairItem.id}
                                    onSuccess={() => {
                                        setIsFormOpen(false);
                                        onDataChange?.(); // Refresh the data
                                        onClose();
                                    }}
                                    guaranteeAvailable={
                                        repairItem.isGuaranteeRequested
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CorpRepairDialog;
