"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useCallback, useEffect, useState } from "react";
import { installedpanel } from "@/src/types/installedpanelType";
import InstalledPanel from "@/components/InstalledPanels/InstalledPanels";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../Loading/LoadingSpinner/LoadingSpinner";
import { getData } from "@/src/services/apiHub";
import { setCorpId } from "@/src/store/slices/userSlice";
import NoRecordFound from "../NoRecordFound/NoRecordFound";
import FilterSection from "../FilterSection/FilterSection";
import CustomPagination from "../Custom/CustomPagination/CustomPagination";

export default function InstalledPanelPagination() {
    const dispatch = useDispatch();
    const [history, sethistory] = useState<installedpanel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState<string>("4");
    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);

    const corpId = useSelector((state: RootState) => state.user.corpId);

    const handelHistory = useCallback(() => {
        if (corpId) {
            setIsLoading(true);
            console.log("corpId", corpId);
            getData({
                // endPoint: `/v1/corp/7/installation/panel`,
                endPoint: `/v1/corp/${corpId}/installation/panel`,
                params: { status, page, sortBy, asc, pageSize: resultPerPage },
            })
                .then((res) => {
                    sethistory(res?.data?.data);
                    setPaginationInfo(res?.data?.pagination);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false));
        }
    }, [status, resultPerPage, corpId, page, sortBy, asc]);
    useEffect(() => {
        handelHistory();
    }, [handelHistory]);

    return (
        <>
            <FilterSection
                header="پنل‌های نصب‌ شده"
                fieldName="پنل"
                statusesListApiRoute={`/v1/installation/panel/status`}
                status={status}
                setStatus={setStatus}
                resultPerPage={resultPerPage}
                setResultPerPage={setResultPerPage}
                setPage={setPage}
                columnsListApiRoute={`/v1/installation/panel/sortable`}
                asc={asc}
                setAsc={setAsc}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            {isLoading ? (
                <LoadingSpinner />
            ) : history?.length > 0 ? (
                <div className="flex flex-col text-white bg-transparent w-full">
                    <div className="flex flex-col text-gray-800  rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
                        {history.map((order: installedpanel, index) => (
                            <InstalledPanel
                                key={index}
                                customer={order?.customer}
                                name={order?.name}
                                power={order?.power}
                                address={order?.address}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="neu-container">
                    <NoRecordFound />
                </div>
            )}
            <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                paginationInfo={paginationInfo}
            />
        </>
    );
}
