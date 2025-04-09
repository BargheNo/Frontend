"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, Wrench, Eclipse, Calendar } from 'lucide-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CustomTextArea } from '@/components/CustomInput/CustomTextArea';

interface RepairHistoryItem {
    title: string;
    panelName: string;
    panelId: string;
    repairMan: string;
    date: string;
    notes: string;
    status: string;
}

interface RepairDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    repairItem: RepairHistoryItem | null;
}

const validationSchema = Yup.object({
    problem: Yup.string()
        .required('لطفا مشکل را توضیح دهید')
        .min(10, 'توضیحات باید حداقل 10 کاراکتر باشد'),
});

const RepairDetailsDialog = ({ isOpen, onClose, repairItem }: RepairDetailsDialogProps) => {
    if (!repairItem) return null;

    const handleSubmit = async (values: { problem: string }) => {
        try {
            // console.log(values);

            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    panelId: repairItem.panelId,
                    problem: values.problem,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle success
            onClose();
        } catch (error) {
            console.error('Error submitting problem:', error);
        }
    };

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
                        {/* Repair Info Section */}
                        <div className='inset-neu-container !w-full !p-5 !bg-[#FEFEFE]'>
                            <h3 className="text-xl font-semibold text-navy-blue mb-4">{repairItem.title}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <div className='flex items-center gap-1'>
                                        <Eclipse size={14} strokeWidth={2.5} className='text-fire-orange' />
                                        <span className="text-sm text-gray-500">نام پنل</span>
                                    </div>
                                    <span className="text-lg font-medium">{repairItem.panelName}</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex items-center gap-1'>
                                        <Wrench size={14} strokeWidth={2.5} className='text-fire-orange' />
                                        <span className="text-sm text-gray-500">تعمیرکار</span>
                                    </div>
                                    <span className="text-lg font-medium">{repairItem.repairMan}</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex items-center gap-1'>
                                        <Calendar size={14} strokeWidth={2.5} className='text-fire-orange' />
                                        <span className="text-sm text-gray-500">تاریخ</span>
                                    </div>
                                    <span className="text-lg font-medium">{repairItem.date}</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex items-center gap-1'>
                                        <AlertCircle size={14} strokeWidth={2.5} className='text-fire-orange' />
                                        <span className="text-sm text-gray-500">وضعیت</span>
                                    </div>
                                    <span className="text-lg font-medium">
                                        {repairItem.status === "done" ? "تکمیل شده" : 
                                         repairItem.status === "in_progress" ? "در حال انجام" : "در انتظار"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Repair Notes */}
                        <div className='inset-neu-container !w-full !p-5 !bg-[#FEFEFE]'>
                            <h4 className="text-lg font-semibold text-navy-blue mb-3">توضیحات تعمیر</h4>
                            <p className="text-gray-700">{repairItem.notes}</p>
                        </div>

                        {/* Problem Report Form */}
                        <div className='w-full mt-5 border-t border-gray-300 pt-5'>
                            <h4 className="text-lg font-semibold text-navy-blue">گزارش مشکل</h4>
                            <Formik
                                initialValues={{ problem: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="flex flex-col space-y-4">
                                        <CustomTextArea
                                            name="problem"
                                            icon={AlertCircle}
                                            textareaClassName="!bg-[#FEFEFE] h-32"
                                        >
                                            توضیحات مشکل
                                        </CustomTextArea>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="self-end
                                                    bg-gradient-to-br from-[#34C759] to-[#00A92B]
                                                    hover:from-[#2AAE4F] hover:to-[#008C25]
                                                    active:from-[#008C25] active:to-[#2AAE4F]
                                                    text-white py-2 px-4 rounded-md transition-all duration-300"
                                        >
                                            ارسال گزارش
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RepairDetailsDialog; 