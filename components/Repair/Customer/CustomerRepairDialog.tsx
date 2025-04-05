"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

// Define the repair item interface
export interface RepairItem {
    id?: string;
    text: string;
    date: string;
    panelName?: string;
    technicalDetails?: {
        capacity: number;
        todayProduction: number;
        efficiency: number;
    };
    address?: string;
    // Add any other properties your repair items might have
}

interface RepairDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    repairItem: RepairItem | null;
}

const RepairDetailsDialog = ({ isOpen, onClose, repairItem }: RepairDetailsDialogProps) => {
    if (!repairItem) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent style={{backgroundColor:"#F1F4FC"}} className='min-w-[57vw]'>
                <DialogHeader>
                    <DialogTitle className='flex justify-center items-end font-bold mt-3.5'>
                        جزئیات تعمیرات
                    </DialogTitle>
                </DialogHeader>
                
                <div className="flex flex-col gap-6 p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-navy-blue">{repairItem.text}</h3>
                        <span className="text-gray-500">{repairItem.date}</span>
                    </div>
                    
                    {repairItem.panelName && (
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="text-lg font-medium mb-2">اطلاعات پنل</h4>
                            <p className="text-gray-700">نام پنل: {repairItem.panelName}</p>
                            
                            {repairItem.technicalDetails && (
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">ظرفیت</span>
                                        <span className="text-lg font-medium">{repairItem.technicalDetails.capacity} کیلووات</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">تولید امروز</span>
                                        <span className="text-lg font-medium">{repairItem.technicalDetails.todayProduction} کیلووات</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">بازدهی</span>
                                        <span className="text-lg font-medium">{repairItem.technicalDetails.efficiency}%</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {repairItem.address && (
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="text-lg font-medium mb-2">آدرس</h4>
                            <p className="text-gray-700">{repairItem.address}</p>
                        </div>
                    )}
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-lg font-medium mb-2">وضعیت تعمیرات</h4>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span>در حال انجام</span>
                        </div>
                        <p className="mt-2 text-gray-700">
                            تعمیرکاران ما در حال بررسی و رفع مشکل در پنل شما هستند. 
                            پیش‌بینی می‌شود این عملیات تا پایان روز جاری به اتمام برسد.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RepairDetailsDialog; 