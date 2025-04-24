import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Calendar as CalendarIcon, NotebookPen, Captions } from 'lucide-react';
import { Datepicker } from '@ijavad805/react-datepicker';
import moment from 'moment';
import { baseURL, postData } from '@/src/services/apiHub';
import { toast } from 'sonner';
import CustomInput from '@/components/Custom/CustomInput/CustomInput';
import CustomTextArea from '@/components/Custom/CustomTextArea/CustomTextArea';
import { RepairFormValues } from '@/types/CorpTypes';

interface RepairFormProps {
    panelId: number;
    onSuccess: () => void;
}

const RepairForm: React.FC<RepairFormProps> = ({ panelId, onSuccess }) => {
    return (
        <div className='w-full p-5 border-t-2 border-gray-300'>
            <Formik
                initialValues={{
                    date: '',
                    time: '',
                    title: '',
                    note: '',
                }}
                validationSchema={Yup.object({
                    date: Yup.string().required('تاریخ را مشخص کنید.'),
                    time: Yup.string().required('زمان را وارد کنید.'),
                    title: Yup.string().required('لطفا عنوان را وارد کنید!'),
                    note: Yup.string().required('لطفا جزئیات تعمیر را وارد کنید!'),
                })}
                onSubmit={(values: RepairFormValues) => {
                    const dateTime = moment(`${values.date}T${values.time}`).toISOString();
                    
                    const submissionData = {
                        panelID: panelId,
                        date: dateTime,
                        title: values.title,
                        details: values.note,
                    };

                    postData({
                        endPoint: `${baseURL}/v1/corp/1/maintenance/record/add`,
                        data: submissionData
                    }).then(() => {
                        toast.success("گزارش با موفقیت ثبت شد!");
                        onSuccess();
                    })
                    .catch(() => {
                        toast.error("مشکلی در ثبت گزارش پیش آمد!");
                    });
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <h4 className="text-lg font-semibold text-navy-blue mb-3">افزودن سابقۀ تعمیر</h4>
                        <div className="flex-1">
                            <CustomInput
                                name="title"
                                icon={NotebookPen}
                                type="text"
                                inputClassName='!bg-[#FEFEFE]'
                                containerClassName="!m-0"
                            >
                                عنوان
                            </CustomInput>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative inset-input">
                                    <div className='ml-8'>
                                        <Datepicker
                                            name="date"
                                            input={
                                                <input
                                                    placeholder="تاریخ را انتخاب کنید"
                                                    className="w-full p-2 pl-10"
                                                    style={{ paddingLeft: '42px' }}
                                                />
                                            }
                                            lang="fa"
                                            theme="blue"
                                            format="YYYY-MM-DD"
                                            closeWhenSelectADay={true}
                                            defaultValue={formik.values.date ? moment(formik.values.date) : undefined}
                                            onChange={(val: moment.Moment | undefined) => {
                                                formik.setFieldValue('date', val?.format('YYYY-MM-DD'));
                                            }}
                                            adjustPosition="auto"
                                        />
                                    </div>
                                    <CalendarIcon
                                        size={18}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fire-orange"
                                    />
                                </div>
                                {formik.touched.date && formik.errors.date && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.date}</p>
                                )}
                            </div>

                            <div className='flex-1'>
                                <input
                                    type="time"
                                    id="time"
                                    name='time'
                                    value={formik.values.time}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full inset-input border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {formik.touched.time && formik.errors.time && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.time}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <CustomTextArea
                                name="note"
                                icon={Captions}
                                textareaClassName="!bg-[#FEFEFE] h-32"
                            >
                                یادداشت تعمیر
                            </CustomTextArea>
                        </div>

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
    );
};

export default RepairForm; 