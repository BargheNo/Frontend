import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { CircleAlert, CircleChevronLeft, ListCollapse, ReceiptText, Shapes, Timer } from 'lucide-react';
import React, { useState } from 'react'
import MetricBox from '@/components/IconWithBackground/MetricBox';
import { Warranty, TermItem } from './warrantyTypes.ts';

const TermItem = ({ title, description, limitations } : TermItem) => {
    return (
        <div className='space-y-4 pb-2 mb-2 border-b-1 border-gray-400'>
            <div className='flex space-x-2'>
                <ReceiptText className='text-fire-orange' />
                <span>{title}</span>
            </div>
            <div className='flex space-x-2'>
                <ListCollapse className='text-fire-orange' />
                <span>{description}</span>
            </div>
            <div className='flex space-x-2'>
                <CircleAlert className='text-fire-orange' />
                <span>{limitations}</span>
            </div>
        </div>
    );
}

const WarrantyDetails = ({name, description, type, duration, terms} : Warranty) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}  >
            <DialogTrigger asChild>
                <button className='red-circle-button w-full !h-fit py-3 space-x-2'>
                    <span>جزئیات بیشتر</span>
                    <CircleChevronLeft />
                </button>
            </DialogTrigger>
            <DialogContent
                style={{ backgroundColor: "#F1F4FC" }}
				className="w-full sm:min-w-[750px] max-w-xl mx-auto p-4  overflow-auto py-4 space-y-3"
                dir='rtl'
            >
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-end font-bold mt-3.5 mb-2">
                        جزئیات گارانتی
                    </DialogTitle>
                </DialogHeader>

                <h1 className='font-black text-2xl'>
                    {name}
                </h1>

                <div className='flex w-full space-x-8'>
                    <MetricBox
                        title='نوع گارانتی'
                        icon={Shapes}
                        className='w-1/2'
                    >
                        {type}
                    </MetricBox>
                    <MetricBox
                        title='مدت زمان'
                        icon={Timer}
                        className='w-1/2'
                    >
                        {duration}
                    </MetricBox>
                </div>


                <div className='w-full flex flex-col'>
                    <h2 className='font-black text-xl'>
                        توضیحات
                    </h2>
                    <span className='inset-neu-container w-full p-5 max-h-40 overflow-y-scroll'>
                        {description}
                    </span>
                </div>

                <div className=''>
                    <h2 className='font-black text-xl mb-2'>
                        شرایط
                    </h2>
                    <div className='inset-neu-container w-full max-h-56 p-5 overflow-y-scroll'>
                        {terms.map((termItem, index) =>
                            <TermItem
                                key={index}
                                title={termItem.title}
                                description={termItem.description}
                                limitations={termItem.limitations}
                            />
                        )}
                    </div>
                </div>

                <div>
                    <button className='red-circle-button w-full h-11'>
                        آرشیو کردن
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default WarrantyDetails