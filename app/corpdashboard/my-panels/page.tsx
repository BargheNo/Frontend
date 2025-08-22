"use client";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import PanelCard from "@/components/Panel/PanelCard/PanelCard";
import { getData } from "@/src/services/apiHub";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import FilterSection from "@/components/FilterSection/FilterSection";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

interface CorpPanelProps {
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
    customer: {
        id: number;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        emailVerified: boolean;
        nationalID: string;
        profilePic: string;
        status: string;
    };
    operator: {
        id: number;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        emailVerified: boolean;
        nationalID: string;
        profilePic: string;
        status: string;
    };
}

const CorpMyPanels = () => {
    const corpId = useSelector((state: RootState) => state.user.corpId);
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [panels, setPanels] = useState<CorpPanelProps[]>([]);
    const [status, setStatus] = useState<string>("");
    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);

    const [query, setQuery] = useState<string>("");

    const fetchPanels = useCallback(() => {
        if (!corpId) return;
        setLoading(true);
        getData({
            endPoint: `/v1/corp/${corpId}/installation/panel`,
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
                console.log(data?.data?.data);
                setPanels(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [status, resultPerPage, page, sortBy, asc, query, corpId]);

    useEffect(() => {
        if (corpId) {
            fetchPanels();
        }
    }, [fetchPanels, corpId]);
    
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
                query={query}
                setQuery={setQuery}
                onSearchSubmit={() => fetchPanels()}
            />
            <div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden border-1 border-gray-200 shadow-[-6px_-6px_16px_rgba(255,255,255,1),6px_6px_16px_rgba(0,0,0,0.3)]">
                {loading ? (
                    <LoadingSpinner />
                ) : panels.length > 0 ? (
                    <>
                        {panels.map((panel: CorpPanelProps, index) => (
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
                                redirectPath={`/corpdashboard/my-panels/${panel.id}`}
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

export default CorpMyPanels;
