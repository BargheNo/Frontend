import React, { useEffect, useState } from "react";
import { getData } from "@/src/services/apiHub";
import PanelEventSummaryCard from "@/components/Panel/PanelEventHistory/PanelEventSummaryCard";
import CorpPanelEventHistoryDialog from "./CorpPanelEventHistoryDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

interface EventItem {
    datalog_serial: string;
    pv_serial: string;
    event_code: string;
    description: string;
    severity: string;
    timestamp: string;
}

interface CorpPanelEventHistoryProps {
    panelId: string;
}

const CorpPanelEventHistory: React.FC<CorpPanelEventHistoryProps> = ({ panelId }) => {
    const corpId = useSelector((state: RootState) => state.user.corpId);
    const [lastEvent, setLastEvent] = useState<EventItem | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!corpId) return;
        setLoading(true);
        getData({ endPoint: `/v1/corp/${corpId}/installation/panel/${panelId}/event?page=1&pageSize=1` })
            .then((res) => {
                const events = res?.data?.data || [];
                setLastEvent(events.length > 0 ? events[0] : null);
            })
            .finally(() => setLoading(false));
    }, [panelId, corpId]);

    return (
        <div className="flex flex-col gap-2">
            <div className="font-bold text-xl text-blue-800">آخرین رویداد پنل</div>
            {loading ? (
                <div dir="rtl" className="text-center py-8">در حال بارگذاری...</div>
            ) : lastEvent ? (
                <PanelEventSummaryCard event={lastEvent} onClick={() => setDialogOpen(true)} />
            ) : (
                <div className="text-center text-gray-500">هیچ رویدادی وجود ندارد.</div>
            )}
            <CorpPanelEventHistoryDialog open={dialogOpen} onClose={() => setDialogOpen(false)} panelId={panelId} />
        </div>
    );
};

export default CorpPanelEventHistory;
