"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Calendar, NotebookPen } from 'lucide-react';
import CustomInput from '@/components/CustomInput/CustomInput';
import { CustomTextArea } from '@/components/CustomInput/CustomTextArea';


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
                        <Formik
                            initialValues={{
                                date: '',
                                title: '',
                                note: '',
                            }}
                            validationSchema={Yup.object({
                                date: Yup.string().required('Required'),
                                title: Yup.string().required('لطفا عنوان را وارد کنید!'),
                                note: Yup.string().required('لطفا جزئیات تعمیر را وارد کنید!'),
                            })}
                            onSubmit={(values) => {
                                console.log('Form Submitted:', values);
                            }}
                        >
                            {(formik) => (
                                <form onSubmit={formik.handleSubmit} className="space-y-4">
                                    {/* Date & Title */}
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1">
                                            <input
                                                type="date"
                                                name="date"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.date}
                                                className="w-full inset-input p-2"
                                            />
                                            {formik.touched.date && formik.errors.date && (
                                                <p className="text-red-500 text-xs mt-1">{formik.errors.date}</p>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <CustomInput
                                                name="title"
                                                icon={Calendar}
                                                type="text"
                                            >
                                                عنوان
                                            </CustomInput>
                                        </div>
                                    </div>

                                    {/* Note */}
                                    <div>
                                        <CustomTextArea
                                            name="note"
                                            icon={NotebookPen}
                                            textareaClassName="additional-classes-if-needed"
                                        >
                                            یادداشت تعمیر
                                        </CustomTextArea>
                                    </div>

                                    {/* Submit Button */}
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-semibold"
                                            onClick={() => alert()}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CorpRepairDialog; 