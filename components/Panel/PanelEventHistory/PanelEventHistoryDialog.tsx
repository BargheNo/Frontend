import React, { useEffect, useState } from "react";
import { getData } from "@/src/services/apiHub";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";

interface EventItem {
    datalog_serial: string;
    pv_serial: string;
    event_code: string;
    description: string;
    severity: string;
    timestamp: string;
}

interface Pagination {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface PanelEventHistoryDialogProps {
    open: boolean;
    onClose: () => void;
    panelId: string;
}

const PanelEventHistoryDialog: React.FC<PanelEventHistoryDialogProps> = ({ open, onClose, panelId }) => {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!open) return;
        setLoading(true);
        getData({ endPoint: `/v1/user/installation/panel/${panelId}/event?page=${page}` })
            .then((res) => {
                setEvents(res?.data?.data || []);
                setPagination(res?.data?.pagination || null);
            })
            .finally(() => setLoading(false));
    }, [open, panelId, page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>تاریخچه رویدادهای پنل</DialogTitle>
                </DialogHeader>
                {loading ? (
                    <LoadingSpinner className="w-16 h-16 mx-auto my-8" />
                ) : (
                    <div className="space-y-4">
                        {events.length === 0 ? (
                            <div className="text-center text-gray-500">هیچ رویدادی وجود ندارد.</div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {events.map((event, idx) => (
                                    <li key={idx} className="py-3 flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`h-2 w-2 rounded-full ${event.severity === 'error' ? 'red-status' : 'yellow-status'}`}></span>
                                            <span className="font-bold">{event.description}</span>
                                            <span className="text-xs text-gray-400">({event.event_code})</span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {format(new Date(event.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-4">
                                <button
                                    className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
                                    disabled={!pagination.hasPrevPage}
                                    onClick={() => handlePageChange(page - 1)}
                                >
                                    قبلی
                                </button>
                                <span className="px-2">صفحه {pagination.currentPage} از {pagination.totalPages}</span>
                                <button
                                    className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
                                    disabled={!pagination.hasNextPage}
                                    onClick={() => handlePageChange(page + 1)}
                                >
                                    بعدی
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default PanelEventHistoryDialog;
