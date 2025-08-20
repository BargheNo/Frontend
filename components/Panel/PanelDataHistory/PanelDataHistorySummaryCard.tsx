import React from "react";
import { format } from "date-fns";
import { ArrowLeft, Database, TrendingUp } from "lucide-react";

interface HistoryDataItem {
    DatalogSerial: string;
    PVSerial: string;
    Date: string;
    EnergyToday: number;
    EnergyTotal: number;
}

interface PanelDataHistorySummaryCardProps {
    latestData: HistoryDataItem;
    onClick: () => void;
}

const PanelDataHistorySummaryCard: React.FC<PanelDataHistorySummaryCardProps> = ({ latestData, onClick }) => {
    const formatEnergy = (energy: number) => {
        if (energy >= 1000) {
            return `${(energy / 1000).toFixed(2)} kWh`;
        }
        return `${energy.toFixed(2)} Wh`;
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'yyyy-MM-dd');
        } catch {
            return dateString;
        }
    };

    return (
        <div onClick={onClick} className="flex flex-row justify-between inset-neu-container !p-4 !w-full cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3">
                    <Database className="text-blue-500 w-5 h-5" />
                    <span className="font-bold text-lg">آخرین داده ثبت شده</span>
                    <span className="text-gray-400 text-sm">({formatDate(latestData.Date)})</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="text-green-500 w-4 h-4" />
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">انرژی امروز</span>
                            <span className="font-semibold">{formatEnergy(latestData.EnergyToday)}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Database className="text-purple-500 w-4 h-4" />
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">انرژی کل</span>
                            <span className="font-semibold">{formatEnergy(latestData.EnergyTotal)}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 justify-center">
                <button className="red-circle-button">
                    <ArrowLeft />
                </button>
                <span className="text-xs text-gray-500">تاریخچه کامل</span>
            </div>
        </div>
    );
};

export default PanelDataHistorySummaryCard;
