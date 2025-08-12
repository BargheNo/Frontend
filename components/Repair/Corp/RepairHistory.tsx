import React, { useEffect } from 'react';
import { CalendarIcon, Captions, NotepadText, User } from 'lucide-react';
// import { MaintenanceRecord } from '@/types/CorpTypes';
import moment from 'jalali-moment';

interface RepairHistoryProps {
    note: {
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
    };
}

const RepairHistory = ({ note }: RepairHistoryProps) => {
    
    
    if (!note) return null;

    

    return (
        <div className="space-y-4">
            {/* {notes.map((note) => ( */}
                <div key={note.id} className="flex flex-col gap-2 justify-center items-center inset-neu-container !w-full !p-5 !bg-gray-50">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                            <User size={20} className="text-gray-500" />
                            <span className="text-sm text-gray-700">
                                {note.operator.firstName} {note.operator.lastName}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon size={20} className="text-gray-500" />
                            <span className="text-sm text-gray-700">
                            {
                                (() => {
                                    try {
                                    if (!note?.createdAt) return "0/0/0 00:00"; // Fallback if missing
                                    const date = moment(note.createdAt);
                                    if (!date.isValid()) return "0/0/0 00:00"; // Fallback if invalid
                                    return date.locale('fa').format('jYYYY/jMM/jDD HH:mm');
                                    } catch {
                                    return "0/0/0 00:00"; // Fallback if conversion fails
                                    }
                                })()
                            }
                            </span>
                        </div>
                    </div>
                    <div className="w-full space-y-2">
                        <div className="flex items-center gap-2">
                            <Captions size={20} className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">عنوان:</span>
                            <span className="text-sm text-gray-700">{note.title}</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <NotepadText size={20} className="text-gray-500 mt-1" />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-700">جزئیات:</span>
                                <span className="text-sm text-gray-700">{note.details}</span>
                            </div>
                        </div>
                        {note.violation && (
                            <div className="mt-4 p-4 bg-red-50 rounded-md">
                                <h5 className="text-sm font-medium text-red-700 mb-2">نقض گارانتی</h5>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-red-700">دلیل:</span>
                                        <span className="text-sm text-red-700">{note.violation.reason}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-sm font-medium text-red-700">جزئیات:</span>
                                        <span className="text-sm text-red-700">{note.violation.details}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            {/* ))} */}
        </div>
    );
};

export default RepairHistory; 