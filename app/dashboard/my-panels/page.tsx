"use client";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import PanelCard from "@/components/Panel/PanelCard/PanelCard";
import { getData } from "@/src/services/apiHub";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import FilterSection from "@/components/FilterSection/FilterSection";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";

interface PanelProps {
    id: number;
    name: string;
    status: string;
    buildingType: string;
    area: number;
    power: number;
    tilt: number;
    azimuth: number;
    totalNumberOfModules: number;
    guaranteeStatus: string;
    address: Address;
    corporation: {
        id: number;
        name: string;
        logo: string;
        addresses: Address[];
    };
}

const Settings = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [panels, setPanels] = useState<PanelProps[]>([]);
    const [status, setStatus] = useState<string>("4");
    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getData({
            endPoint: `/v1/user/installation/panel`,
            params: { status, page, sortBy, asc, pageSize: resultPerPage },
        })
            .then((data) => {
                // console.log(data?.data?.pagination);
                setPanels(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [status, resultPerPage, page, sortBy, asc]);
    return (
        <PageContainer>
            <FilterSection
                header="پنل‌های من"
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
            <div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden border-1 border-gray-200 shadow-[-6px_-6px_16px_rgba(255,255,255,1),6px_6px_16px_rgba(0,0,0,0.3)]">
                {loading ? (
                    <LoadingSpinner />
                ) : panels.length > 0 ? (
                    <>
                        {panels.map((panel: PanelProps, index) => (
                            <PanelCard
                                key={index}
                                id={String(panel?.id)}
                                panelName={panel.name}
                                technicalDetails={{
                                    capacity: panel.power,
                                    todayProduction: 1210,
                                    efficiency: 92,
                                }}
                                status={panel.status}
                                address={`استان ${panel.address.province}، شهر ${panel.address.city}، ${panel.address.streetAddress}`}
                            />
                        ))}
                    </>
                ) : panels ? (
                    <NoRecordFound />
                ) : (
                    <></>
                )}
            </div>
            <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                paginationInfo={paginationInfo}
            />
        </PageContainer>
    );
};

export default Settings;
