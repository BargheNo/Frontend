import React from 'react';
import { CalendarIcon, Captions, NotepadText } from 'lucide-react';
import { MaintenanceRecord } from '@/types/CorpTypes';

interface RepairHistoryProps {
    notes: MaintenanceRecord[] | null;
}

const RepairHistory: React.FC<RepairHistoryProps> = ({ notes }) => {
    return (
        <>
            <h4 className="text-lg font-semibold text-navy-blue">تاریخچۀ تعمیرات قبلی</h4>
            <div className='inset-neu-container overflow-y-auto max-h-[40vh] w-full bg-gradient-to-br from-[#FAFAFB] to-[#E9EBEF]'>
                <div className='flex flex-col divide-y divide-gray-300'>
                    {notes?.map((item: MaintenanceRecord, index: number) => (
                        <div key={index} className='flex flex-col p-5 gap-3'>
                            <div className='flex gap-1'>
                                <CalendarIcon size={18} className='text-fire-orange' />
                                <span className='font-black'>تاریخ:</span>
                                <span>{item.Date}</span>
                            </div>
                            <div className='flex gap-1'>
                                <Captions size={18} className='text-fire-orange' />
                                <span className='font-black'>عنوان:</span>
                                <span>{item.Title}</span>
                            </div>
                            <div className='flex gap-1'>
                                <NotepadText size={18} className='text-fire-orange' />
                                <span className='font-black'>یادداشت:</span>
                                <span>{item.Details}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RepairHistory; 