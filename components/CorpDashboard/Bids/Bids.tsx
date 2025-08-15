import React, { useState, useEffect, useCallback } from "react";
import BidCard from "./BidCard";
import { getData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { GuaranteeProps } from "@/src/types/BidCardTypes";
import Header from "@/components/Header/Header";
// import { RootState } from "@/src/store/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";
import FilterSection from "../../FilterSection/FilterSection";

interface address {
    province: string;
    city: string;
    streetAddress: string;
}

interface Customer {
    firstName: string;
    lastName: string;
}

interface RequestDetails {
    id: number;
    buildingType: string;
    createdTime: string;
    maxCost: number;
    name: string;
    powerRequest: number;
    status: string;
    address: Address;
}

interface Bid {
    id: number;
    cost: string;
    status: string;
    description: string;
    installationTime: string;
    request: RequestDetails;
    power: string;
    area: string;
    guarantee: GuaranteeProps;
}

export default function Bids() {
    const [bidData, setBidData] = useState<Bid[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<string>("");

    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);

    const [query, setQuery] = useState<string>("");

    const corpId = useSelector((state: RootState) => state.user.corpId);

    const updateBids = useCallback(() => {
        setLoading(true);
        getData({
            endPoint: `/v1/corp/${corpId}/bid`,
            params: {
                status,
                page,
                sortBy,
                asc,
                pageSize: resultPerPage,
                query,
            },
        })
            .then((data) => {
                console.log("data", data);
                setBidData(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [status, resultPerPage, corpId, page, sortBy, asc, query]);

    useEffect(() => {
        updateBids();
    }, [updateBids]);

    return (
        <>
            <div className="flex place-items-center">
                <FilterSection
                    fieldName="پیشنهاد"
                    header="پیشنهادهای ارسال شده"
                    statusesListApiRoute={`/v1/corp/${corpId}/bid/status`}
                    status={status}
                    setStatus={setStatus}
                    resultPerPage={resultPerPage}
                    setResultPerPage={setResultPerPage}
                    setPage={setPage}
                    columnsListApiRoute={`/v1/bid/sortable`}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    asc={asc}
                    setAsc={setAsc}
                    query={query}
                    setQuery={setQuery}
                    onSearchSubmit={() => updateBids()}
                />
            </div>
            <div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden bg-[#F0EDEF] shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
                {loading ? (
                    <LoadingSpinner />
                ) : bidData && bidData?.length > 0 ? (
                    bidData?.map((bid, index) => (
                        <BidCard
                            key={index}
                            id={bid?.id}
                            cost={bid?.cost}
                            installationTime={bid?.installationTime}
                            power={bid?.power}
                            area={bid?.area}
                            status={bid?.status}
                            description={bid?.description}
                            panelName={bid?.request?.name}
                            buildingType={bid?.request?.buildingType}
                            address={bid?.request?.address}
                            guaranteeID={
                                bid?.guarantee?.id ? bid?.guarantee?.id : ""
                            }
                            updateBids={updateBids}
                        />
                    ))
                ) : (
                    <div>
                        <NoRecordFound text="هیچ پیشنهادی یافت نشد." />
                    </div>
                )}
            </div>
            <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                paginationInfo={paginationInfo}
            />
        </>
    );
}
