import React, { useEffect, useState } from "react";
import { getData } from "@/src/services/apiHub";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { Database, Calendar, Zap, TrendingUp } from "lucide-react";

interface HistoryDataItem {
    DatalogSerial: string;
    PVSerial: string;
    Date: string;
    EnergyToday: number;
    EnergyTotal: number;
}

interface Pagination {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface PanelDataHistoryDialogProps {
    open: boolean;
    onClose: () => void;
    panelId: string;
}

const PanelDataHistoryDialog: React.FC<PanelDataHistoryDialogProps> = ({ open, onClose, panelId }) => {
    const [historyData, setHistoryData] = useState<HistoryDataItem[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!open) return;
        setLoading(true);
        getData({ endPoint: `/v1/user/installation/panel/${panelId}/history?page=${page}` })
            .then((res) => {
                setHistoryData(res?.data?.data || []);
                setPagination(res?.data?.pagination || null);
            })
            .finally(() => setLoading(false));
    }, [open, panelId, page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'yyyy-MM-dd');
        } catch {
            return dateString;
        }
    };

    const formatEnergy = (energy: number) => {
        if (energy >= 1000) {
            return `${(energy / 1000).toFixed(2)} kWh`;
        }
        return `${energy.toFixed(2)} Wh`;
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>تاریخچه داده‌های پنل</DialogTitle>
                </DialogHeader>
                {loading ? (
                    <LoadingSpinner className="w-16 h-16 mx-auto my-8" />
                ) : (
                    <div className="space-y-4 overflow-y-auto">
                        {historyData.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">هیچ داده تاریخی وجود ندارد.</div>
                        ) : (
                            <div className="space-y-3">
                                {historyData.map((item, idx) => (
                                    <div key={idx} className="inset-neu-container !p-4 !w-full">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                            {/* Date */}
                                            <div className="flex items-center gap-2">
                                                <Calendar className="text-blue-500 w-4 h-4" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500">تاریخ</span>
                                                    <span className="font-medium">{formatDate(item.Date)}</span>
                                                </div>
                                            </div>

                                            {/* Datalog Serial */}
                                            <div className="flex items-center gap-2">
                                                <Database className="text-orange-500 w-4 h-4" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500">سریال دیتالاگ</span>
                                                    <span className="font-medium text-sm">{item.DatalogSerial}</span>
                                                </div>
                                            </div>

                                            {/* PV Serial */}
                                            <div className="flex items-center gap-2">
                                                <Zap className="text-yellow-500 w-4 h-4" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500">سریال PV</span>
                                                    <span className="font-medium text-sm">{item.PVSerial}</span>
                                                </div>
                                            </div>

                                            {/* Energy Today */}
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="text-green-500 w-4 h-4" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500">انرژی امروز</span>
                                                    <span className="font-medium">{formatEnergy(item.EnergyToday)}</span>
                                                </div>
                                            </div>

                                            {/* Energy Total */}
                                            <div className="flex items-center gap-2">
                                                <Database className="text-purple-500 w-4 h-4" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500">انرژی کل</span>
                                                    <span className="font-medium">{formatEnergy(item.EnergyTotal)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-4 pb-4">
                                <button
                                    className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
                                    disabled={!pagination.hasPrevPage}
                                    onClick={() => handlePageChange(page - 1)}
                                >
                                    قبلی
                                </button>
                                <span className="px-4 py-2 text-sm">
                                    صفحه {pagination.currentPage} از {pagination.totalPages}
                                </span>
                                <button
                                    className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
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

export default PanelDataHistoryDialog;
