import React, { useEffect, useState } from "react";
import { getData } from "@/src/services/apiHub";
import PanelDataHistorySummaryCard from "@/components/Panel/PanelDataHistory/PanelDataHistorySummaryCard";
import CorpPanelDataHistoryDialog from "./CorpPanelDataHistoryDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

interface HistoryDataItem {
    DatalogSerial: string;
    PVSerial: string;
    Date: string;
    EnergyToday: number;
    EnergyTotal: number;
}

interface CorpPanelDataHistoryProps {
    panelId: string;
}

const CorpPanelDataHistory: React.FC<CorpPanelDataHistoryProps> = ({ panelId }) => {
    const corpId = useSelector((state: RootState) => state.user.corpId);
    const [latestData, setLatestData] = useState<HistoryDataItem | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!corpId) return;
        setLoading(true);
        getData({ endPoint: `/v1/corp/${corpId}/installation/panel/${panelId}/history?page=1&pageSize=1` })
            .then((res) => {
                const historyData = res?.data?.data || [];
                setLatestData(historyData.length > 0 ? historyData[0] : null);
            })
            .finally(() => setLoading(false));
    }, [panelId, corpId]);

    return (
        <div className="flex flex-col gap-2">
            <div className="font-bold text-xl text-blue-800">تاریخچه داده‌های پنل</div>
            {loading ? (
                <div dir="rtl" className="text-center py-8">در حال بارگذاری...</div>
            ) : latestData ? (
                <PanelDataHistorySummaryCard 
                    latestData={latestData} 
                    onClick={() => setDialogOpen(true)} 
                />
            ) : (
                <div className="text-center text-gray-500 inset-neu-container !p-8 !w-full">
                    هیچ دادۀ تاریخی‌ای وجود ندارد.
                </div>
            )}
            <CorpPanelDataHistoryDialog 
                open={dialogOpen} 
                onClose={() => setDialogOpen(false)} 
                panelId={panelId}
            />
        </div>
    );
};

export default CorpPanelDataHistory;
