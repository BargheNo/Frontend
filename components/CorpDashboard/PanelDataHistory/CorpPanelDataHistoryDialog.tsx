import React, { useEffect, useState } from "react";
import { getData } from "@/src/services/apiHub";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { Database, Calendar, Zap, TrendingUp } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

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

interface CorpPanelDataHistoryDialogProps {
    open: boolean;
    onClose: () => void;
    panelId: string;
}

const CorpPanelDataHistoryDialog: React.FC<CorpPanelDataHistoryDialogProps> = ({ open, onClose, panelId }) => {
    const corpId = useSelector((state: RootState) => state.user.corpId);
    const [historyData, setHistoryData] = useState<HistoryDataItem[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!open || !corpId) return;
        setLoading(true);
        getData({ endPoint: `/v1/corp/${corpId}/installation/panel/${panelId}/history?page=${page}` })
            .then((res) => {
                setHistoryData(res?.data?.data || []);
                setPagination(res?.data?.pagination || null);
            })
            .finally(() => setLoading(false));
    }, [open, panelId, page, corpId]);

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
                                                <TrendingUp className="text-purple-500 w-4 h-4" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500">انرژی کل</span>
                                                    <span className="font-medium">{formatEnergy(item.EnergyTotal)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Pagination */}
                                {pagination && pagination.totalPages > 1 && (
                                    <div className="flex justify-center items-center space-x-2 pt-4">
                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                                            disabled={!pagination.hasPrevPage}
                                            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            قبلی
                                        </button>
                                        <span className="px-4 py-2 text-sm text-gray-600">
                                            صفحه {pagination.currentPage} از {pagination.totalPages}
                                        </span>
                                        <button
                                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                                            disabled={!pagination.hasNextPage}
                                            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                        >
                                            بعدی
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CorpPanelDataHistoryDialog;
