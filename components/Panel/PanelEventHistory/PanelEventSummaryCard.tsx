import React from "react";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

interface EventItem {
    datalog_serial: string;
    pv_serial: string;
    event_code: string;
    description: string;
    severity: string;
    timestamp: string;
}

interface PanelEventSummaryCardProps {
    event: EventItem;
    onClick: () => void;
}

const PanelEventSummaryCard: React.FC<PanelEventSummaryCardProps> = ({ event, onClick }) => {
    return (
        <div onClick={onClick} className="flex flex-col md:flex-row justify-between inset-neu-container !p-4 !w-full cursor-pointer">
            <div
                className={`flex flex-col gap-2`}
            >
                <div className="flex items-center gap-2">
                    <span className={`h-4 w-4 rounded-full ${event.severity === 'error' ? 'red-status' : 'yellow-status'}`}></span>
                    <span className="font-bold text-xl">{event.description}</span>
                    <span className="text-gray-400">({event.event_code})</span>
                </div>
                <div className="text-gray-500">
                    {format(new Date(event.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <button className="red-circle-button !h-10 !w-full md:!w-12 md:!h-12"><span className="block md:hidden">سایر رویدادها</span><ArrowLeft /></button>
                <span className="text-xs text-gray-500 hidden md:block">سایر رویدادها</span>
            </div>
        </div>
    );
};

export default PanelEventSummaryCard;
