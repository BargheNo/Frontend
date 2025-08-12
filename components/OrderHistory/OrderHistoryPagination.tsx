"use client";
import { Orderhistory } from "@/src/types/OrderhistoryType";
import OrderHistory from "@/components/OrderHistory/OrderHistory";
import LoadingSpinner from "../Loading/LoadingSpinner/LoadingSpinner";
import NoRecordFound from "../NoRecordFound/NoRecordFound";
import FilterSection from "../FilterSection/FilterSection";
import CustomPagination from "../Custom/CustomPagination/CustomPagination";

export default function OrderHistoryPagination({
    status,
    setStatus,
    isLoading,
    history,
    asc,
    setAsc,
    sortBy,
    setSortBy,
    query,
    setQuery,
    onSearchSubmit,
}: // resultPerPage,
// setResultPerPage,
// currentPage,
// setCurrentPage,
// paginationInfo,
{
    status: string;
    setStatus: any;
    isLoading: boolean;
    history: Orderhistory[];
    asc: boolean;
    setAsc: React.Dispatch<React.SetStateAction<boolean>>;
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    onSearchSubmit: () => void;
    // resultPerPage: string;
    // setResultPerPage: React.Dispatch<React.SetStateAction<string>>;
    // currentPage: number;
    // setCurrentPage: any;
    // paginationInfo: any;
}) {
    return (
        <>
            <FilterSection
                header="سابقه سفارشات"
                statusesListApiRoute={`/v1/installation/request/status`}
                fieldName="درخواست"
                status={status}
                setStatus={setStatus}
                columnsListApiRoute={`/v1/installation/request/sortable`}
                asc={asc}
                setAsc={setAsc}
                sortBy={sortBy}
                setSortBy={setSortBy}
                query={query}
                setQuery={setQuery}
                onSearchSubmit={onSearchSubmit}
                // resultPerPage={resultPerPage}
                // setResultPerPage={setResultPerPage}
            />
            {isLoading ? (
                <LoadingSpinner />
            ) : history?.length > 0 ? (
                <>
                    <div className="flex flex-col bg-transparent">
                        <div className="flex flex-col text-gray-800 rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
                            {history.map((order: Orderhistory, index) => (
                                <OrderHistory
                                    key={index}
                                    id={index}
                                    name={order.name}
                                    address={order.address}
                                    status={order.status}
                                    createdTime={order.createdTime}
                                />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <NoRecordFound text="هیچ سفارشی یافت نشد." />
            )}
            {/* <CustomPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                paginationInfo={paginationInfo}
            /> */}
        </>
    );
}
