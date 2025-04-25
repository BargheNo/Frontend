"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { baseURL, getData } from '@/src/services/apiHub';
import { toast } from 'sonner';
import { CorpRepairDialogProps, MaintenanceRecord } from '@/types/CorpTypes';
import RepairHistory from './RepairHistory';
import RepairForm from './RepairForm';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

const CorpRepairDialog = ({ isOpen, onClose, repairItem }: CorpRepairDialogProps) => {
    const [notes, setNotes] = useState<MaintenanceRecord[] | null>(null);
    const [isLoadingNotes, setIsLoadingNotes] = useState(true);

    useEffect(() => {
        if (repairItem) {
            getData({
                endPoint: `${baseURL}/v1/corp/1/maintenance/record/list/${repairItem.Panel.id.toString()}`
            })
            .then(res => {
                setNotes(res.data);
                setIsLoadingNotes(false);
            })
            .catch(() => {
                toast.error("خطا در دریافت یادداشت‌‌های پنل");
                setIsLoadingNotes(false);
            })
        }
    }, [repairItem]);

    if (!repairItem) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent style={{backgroundColor:"#FEFEFE"}} className='min-w-[57vw] h-[80vh]'>
                <DialogHeader>
                    <DialogTitle className='flex justify-center items-end font-bold mt-3.5'>
                        جزئیات تعمیرات
                    </DialogTitle>
                </DialogHeader>
                
                <div className="overflow-y-auto max-h-[calc(80vh-100px)] pr-2">
                    <div dir="rtl" className='flex flex-col gap-5'>
                        {isLoadingNotes ? (
                            <div className="flex justify-center items-center h-full">
                                <LoadingSpinner />
                            </div>
                        ) : notes && notes.length > 0 ? (
                            <RepairHistory notes={notes} />
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-4 py-8">
                                <div className="text-6xl text-gray-400 font-bold">!</div>
                                <p className="text-gray-500">هیچ یادداشتی ثبت نشده است</p>
                            </div>
                        )}
                        <div className='flex flex-col gap-2 justify-center items-center inset-neu-container !w-full !p-5 !bg-gray-50'>
                            <h4 className="text-lg self-start font-semibold text-navy-blue">جزئیات تعمیر</h4>
                            <span className='self-start'>{repairItem.Description}</span>
                        </div>
                        <RepairForm panelId={repairItem.Panel.id} onSuccess={onClose} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CorpRepairDialog;