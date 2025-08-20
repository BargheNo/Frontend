import React from "react";
import { format } from "date-fns";

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
        <div
            className={`flex flex-col gap-2 p-4 rounded-lg cursor-pointer shadow-md border ${event.severity === 'error' ? 'border-red-400' : 'border-yellow-300'} bg-white hover:bg-gray-50 transition`}
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${event.severity === 'error' ? 'bg-red-500' : 'bg-yellow-400'}`}></span>
                <span className="font-bold">{event.description}</span>
                <span className="text-xs text-gray-400">({event.event_code})</span>
            </div>
            <div className="text-xs text-gray-500">
                {format(new Date(event.timestamp), 'yyyy-MM-dd HH:mm:ss')}
            </div>
        </div>
    );
};

export default PanelEventSummaryCard;
