import React, { useEffect, useState } from "react";
import { getData } from "@/src/services/apiHub";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
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

interface Pagination {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface CorpPanelEventHistoryDialogProps {
    open: boolean;
    onClose: () => void;
    panelId: string;
}

const CorpPanelEventHistoryDialog: React.FC<CorpPanelEventHistoryDialogProps> = ({ open, onClose, panelId }) => {
    const corpId = useSelector((state: RootState) => state.user.corpId);
    const [events, setEvents] = useState<EventItem[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!open || !corpId) return;
        setLoading(true);
        getData({ endPoint: `/v1/corp/${corpId}/installation/panel/${panelId}/event?page=${page}` })
            .then((res) => {
                setEvents(res?.data?.data || []);
                setPagination(res?.data?.pagination || null);
            })
            .finally(() => setLoading(false));
    }, [open, panelId, page, corpId]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const getSeverityColor = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'error':
                return 'text-red-600 bg-red-100';
            case 'warning':
                return 'text-yellow-600 bg-yellow-100';
            case 'info':
                return 'text-blue-600 bg-blue-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">
                        تاریخچه رویدادهای پنل
                    </DialogTitle>
                </DialogHeader>
                
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="space-y-4">
                        {events.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                هیچ رویدادی یافت نشد.
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    {events.map((event, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">
                                                        {event.description || 'توضیح ناموجود'}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        کد رویداد: {event.event_code}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}
                                                >
                                                    {event.severity}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600 space-y-1">
                                                <div>سریال Datalog: {event.datalog_serial}</div>
                                                <div>سریال PV: {event.pv_serial}</div>
                                                <div>
                                                    زمان: {format(new Date(event.timestamp), 'yyyy/MM/dd HH:mm:ss')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {pagination && pagination.totalPages > 1 && (
                                    <div className="flex justify-center items-center space-x-2 pt-4">
                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                                            disabled={!pagination.hasPrevPage}
                                            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            قبلی
                                        </button>
                                        <span className="px-4 py-2">
                                            صفحه {pagination.currentPage} از {pagination.totalPages}
                                        </span>
                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                                            disabled={!pagination.hasNextPage}
                                            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            بعدی
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CorpPanelEventHistoryDialog;
