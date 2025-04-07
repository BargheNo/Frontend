"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Calendar, SplitSquareVertical } from 'lucide-react';

// Define the repair item interface
export interface CorpRepairItem {
    id: string;
    text: string;
    date: string;
    panelName: string;
    technicalDetails: {
        capacity: number;
        todayProduction: number;
        efficiency: number;
    };
    address: string;
    owner: string;
}

interface CorpRepairDialogProps {
    isOpen: boolean;
    onClose: () => void;
    repairItem: CorpRepairItem | null;
}

const CorpRepairDialog = ({ isOpen, onClose, repairItem }: CorpRepairDialogProps) => {
    const formik = useFormik({
        initialValues: {
          date: '',
          title: '',
          note: '',
        },
        validationSchema: Yup.object({
          date: Yup.string().required('Required'),
          title: Yup.string().required('Required'),
          note: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
          console.log('Form Submitted:', values);
        },
    });

    if (!repairItem) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent style={{backgroundColor:"#FEFEFE"}} className='min-w-[57vw] h-full'>
                <DialogHeader>
                    <DialogTitle className='flex justify-center items-end font-bold mt-3.5'>
                        جزئیات تعمیرات
                    </DialogTitle>
                </DialogHeader>
                
                <div dir="rtl" className='flex flex-col gap-5'>
                    <div className='h-1/3 inset-neu-container overflow-y-scroll w-full bg-gradient-to-br from-[#FAFAFB] to-[#E9EBEF]'>
                        <div className='flex flex-col p-5 border-b border-gray-300 gap-3'>
                            <div className='flex gap-1'>
                                <Calendar size={18} className='text-fire-orange' />
                                <span className='font-black'>تاریخ:</span>
                                <span>{repairItem.date}</span>
                            </div>
                            <div className='flex gap-1'>
                                <Calendar size={18} className='text-fire-orange' />
                                <span className='font-black'>عنوان:</span>
                                <span>{repairItem.panelName}</span>
                            </div>
                            <div className='flex gap-1'>
                                <Calendar size={18} className='text-fire-orange' />
                                <span className='font-black'>یادداشت:</span>
                                <span>{repairItem.panelName}</span>
                            </div>
                        </div>
                        <div className='flex flex-col p-5 border-b border-gray-300 gap-3'>
                            <div className='flex gap-1'>
                                <Calendar size={18} className='text-fire-orange' />
                                <span className='font-black'>تاریخ:</span>
                                <span>{repairItem.date}</span>
                            </div>
                            <div className='flex gap-1'>
                                <Calendar size={18} className='text-fire-orange' />
                                <span className='font-black'>عنوان:</span>
                                <span>{repairItem.panelName}</span>
                            </div>
                            <div className='flex gap-1'>
                                <Calendar size={18} className='text-fire-orange' />
                                <span className='font-black'>یادداشت:</span>
                                <span>{repairItem.panelName}</span>
                            </div>
                        </div>
                        <div className='flex flex-col p-5 border-b border-gray-300 gap-3'>
                            <div className='flex gap-1'>
                                <Calendar size={18} className='text-fire-orange' />
                                <span className='font-black'>تاریخ:</span>
                                <span>{repairItem.date}</span>
                            </div>
                            <div className='flex gap-1'>
                                <Calendar size={18} className='text-fire-orange' />
                                <span className='font-black'>عنوان:</span>
                                <span>{repairItem.panelName}</span>
                            </div>
                            <div className='flex gap-1'>
                                <Calendar size={18} className='text-fire-orange' />
                                <span className='font-black'>یادداشت:</span>
                                <span>{repairItem.panelName}</span>
                            </div>
                        </div>

                    </div>

                    <div className=''>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            {/* Date & Title */}
                            <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input
                                type="date"
                                name="date"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.date}
                                className="w-full inset-input"
                                />
                                {formik.touched.date && formik.errors.date && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.date}</p>
                                )}
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                type="text"
                                name="title"
                                placeholder="Note title"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                                className="w-full inset-input"
                                />
                                {formik.touched.title && formik.errors.title && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
                                )}
                            </div>
                            </div>

                            {/* Note */}
                            <div>
                            <label className="block text-sm font-medium text-gray-700">Note</label>
                            <textarea
                                name="note"
                                placeholder="Write your note here..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.note}
                                rows={4}
                                className="w-full inset-input p-2"
                            />
                            {formik.touched.note && formik.errors.note && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.note}</p>
                            )}
                            </div>

                            {/* Submit Button */}
                            <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-semibold"
                            >
                                Submit
                            </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* <div className="flex flex-col gap-6 p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-navy-blue">{repairItem.text}</h3>
                        <span className="text-gray-500">{repairItem.date}</span>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-lg font-medium mb-2">اطلاعات پنل</h4>
                        <p className="text-gray-700">نام پنل: {repairItem.panelName}</p>
                        <p className="text-gray-700 mt-2">مالک: {repairItem.owner}</p>
                        
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
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-lg font-medium mb-2">آدرس</h4>
                        <p className="text-gray-700">{repairItem.address}</p>
                    </div>
                    
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
                </div> */}
            </DialogContent>
        </Dialog>
    );
};

export default CorpRepairDialog; 