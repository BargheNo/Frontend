import React from "react";
import { useEffect, useState } from "react";
import RequestCard from "./RequestCard/RequestCard";
import { getData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import DateConverter from "@/src/functions/toJalali";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import FilterSection from "@/components/FilterSection/FilterSection";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";

interface address {
    province: string;
    city: string;
}

interface Request {
    id: number;
    name: string;
    buildingType: string;
    createdTime: string;
    status: string;
    address: address;
    powerRequest: number;
    maxCost: number;
}

// interface status {
// 	id: number;
// 	name: string;
// }

export default function Requests() {
    const [loading, setLoading] = useState<boolean>(true);
    const [requestData, setRequestData] = useState<Request[] | null>(null);
    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const corpId = useSelector((state: RootState) => state.user.corpId);
    useEffect(() => {
        setLoading(true);
        getData({
            endPoint: `/v1/corp/${corpId}/installation/request`,
            params: { page, pageSize: resultPerPage },
        })
            .then((data) => {
                // console.log(data?.data?.data);
                setRequestData(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [corpId, resultPerPage, page]);

    return (
        <>
            <FilterSection
                header="درخواست‌های موجود در سرتاسر سامانه"
                resultPerPage={resultPerPage}
                setResultPerPage={setResultPerPage}
                setPage={setPage}
            />
            {/* <Header header="درخواست‌های موجود در سرتاسر سامانه" /> */}
            <div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden bg-[#F0EDEF] shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
                {loading ? (
                    <LoadingSpinner />
                ) : requestData && requestData?.length > 0 ? (
                    requestData?.map((request) => (
                        <RequestCard
                            key={request.id}
                            panelDetails={{
                                panelName: request?.name,
                                address: `استان ${request?.address?.province}، شهر ${request?.address?.city}`,
                                capacity: request?.powerRequest,
                                price: request?.maxCost,
                                buildingType: request?.buildingType,
                                status: request?.status,
                                createdTime: DateConverter(
                                    request?.createdTime
                                ),
                            }}
                            requestId={request?.id}
                        />
                    ))
                ) : (
                    <NoRecordFound text="هیچ درخواستی یافت نشد." />
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
