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
import { Calendar as CalendarIcon, NotebookPen, NotepadText, Captions } from 'lucide-react';
import CustomInput from '@/components/CustomInput/CustomInput';
import { CustomTextArea } from '@/components/CustomInput/CustomTextArea';
import { Datepicker } from '@ijavad805/react-datepicker';
import moment from 'moment';

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
            <DialogContent style={{backgroundColor:"#FEFEFE"}} className='min-w-[57vw] h-[80vh]'>
                <DialogHeader>
                    <DialogTitle className='flex justify-center items-end font-bold mt-3.5'>
                        جزئیات تعمیرات
                    </DialogTitle>
                </DialogHeader>
                
                <div className="overflow-y-auto max-h-[calc(80vh-100px)] pr-2">
                    <div dir="rtl" className='flex flex-col gap-5'>
                        {/* Repair History Section */}
                        <h4 className="text-lg font-semibold text-navy-blue">تاریخچۀ تعمیرات قبلی</h4>
                        <div className='inset-neu-container overflow-y-auto max-h-[40vh] w-full bg-gradient-to-br from-[#FAFAFB] to-[#E9EBEF]'>
                            <div className='flex flex-col divide-y divide-gray-300'>
                                {[1, 2, 3].map((item, index) => (
                                    <div key={index} className='flex flex-col p-5 gap-3'>
                                        <div className='flex gap-1'>
                                            <CalendarIcon size={18} className='text-fire-orange' />
                                            <span className='font-black'>تاریخ:</span>
                                            <span>{repairItem.date}</span>
                                        </div>
                                        <div className='flex gap-1'>
                                            <Captions size={18} className='text-fire-orange' />
                                            <span className='font-black'>عنوان:</span>
                                            <span>{repairItem.panelName}</span>
                                        </div>
                                        <div className='flex gap-1'>
                                            <NotepadText size={18} className='text-fire-orange' />
                                            <span className='font-black'>یادداشت:</span>
                                            <span>{repairItem.panelName}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Repair Form Section */}
                        <div className='w-full p-5'>
                            <Formik
                                initialValues={{
                                    date: '',
                                    title: '',
                                    note: '',
                                }}
                                validationSchema={Yup.object({
                                    date: Yup.string().required('تاریخ را مشخص کنید.'),
                                    title: Yup.string().required('لطفا عنوان را وارد کنید!'),
                                    note: Yup.string().required('لطفا جزئیات تعمیر را وارد کنید!'),
                                })}
                                onSubmit={(values) => {
                                    console.log('Form Submitted:', values);
                                }}
                            >
                                {(formik) => (
                                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                                        <h4 className="text-lg font-semibold text-navy-blue mb-3">افزودن سابقۀ تعمیر</h4>
                                        {/* Date & Title */}
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="flex-1">
                                                <div className="relative">
                                                    <Datepicker
                                                        name="date"
                                                        input={
                                                            <input
                                                                placeholder="تاریخ را انتخاب کنید"
                                                                className="w-full inset-input p-2 pl-10"
                                                                style={{ paddingLeft: '42px' }}
                                                            />
                                                        }
                                                        lang="fa"
                                                        theme="blue"
                                                        format="YYYY-MM-DD"
                                                        closeWhenSelectADay={true}
                                                        defaultValue={formik.values.date ? moment(formik.values.date) : undefined}
                                                        onChange={(val: moment.Moment) => {
                                                            formik.setFieldValue('date', val?.format('YYYY-MM-DD'));
                                                        }}
                                                        adjustPosition="auto"
                                                    />
                                                    <CalendarIcon
                                                        size={18}
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fire-orange"
                                                    />
                                                </div>
                                                {formik.touched.date && formik.errors.date && (
                                                    <p className="text-red-500 text-xs mt-1">{formik.errors.date}</p>
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <CustomInput
                                                    name="title"
                                                    icon={CalendarIcon}
                                                    type="text"
                                                    inputClassName='!bg-[#FEFEFE]'
                                                    containerClassName="!m-0"
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
                                                textareaClassName="!bg-[#FEFEFE] h-32"
                                            >
                                                یادداشت تعمیر
                                            </CustomTextArea>
                                        </div>

                                        {/* Submit Button */}
                                        <div className='flex justify-end'>
                                            <button
                                                type="submit"
                                                className="bg-gradient-to-br from-[#34C759] to-[#00A92B]
                                                    hover:from-[#2AAE4F] hover:to-[#008C25]
                                                    active:from-[#008C25] active:to-[#2AAE4F]
                                                    text-white py-2 px-4 rounded-md transition-all duration-300"
                                            >
                                                ثبت سابقۀ تعمیرات
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CorpRepairDialog;