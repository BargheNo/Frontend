"use client";
import React, { useEffect, useState } from "react";
import CorpRepairCard from "@/components/Repair/Corp/CorpRepairCard";
import CorpRepairDialog from "@/components/Repair/Corp/CorpRepairDialog";
import { CorpRepairItem } from "@/types/CorpTypes";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import FilterSection from "@/components/FilterSection/FilterSection";
import { getData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";

export default function Page() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<CorpRepairItem | null>(
        null
    );
    const [repairItems, setRepairItems] = useState<CorpRepairItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState<string>("7");

    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);

    const corpId = useSelector((state: RootState) => state.corp.id);

    useEffect(() => {
        setIsLoading(true);
        getData({
            endPoint: `/v1/corp/${2}/maintenance/request`,
            params: {
                status,
                page,
                sortBy,
                asc,
                pageSize: resultPerPage,
                corporationID: 2,
            },
        })
            .then((res) => {
                console.log(res?.data);
                setPaginationInfo(res?.data?.pagination);
                setRepairItems(res?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [corpId, status, page, sortBy, asc, resultPerPage]);

    const handleOpenDialog = (item: CorpRepairItem) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedItem(null);
    };

    return (
        <PageContainer>
            <div className="space-y-8 relative">
                <div>
                    <FilterSection
                        header="درخواست‌های تعمیر"
                        fieldName="تعمیر"
                        statusesListApiRoute={`/v1/maintenance/status`}
                        status={status}
                        setStatus={setStatus}
                        resultPerPage={resultPerPage}
                        setResultPerPage={setResultPerPage}
                        setPage={setPage}
                        columnsListApiRoute={`/v1/maintenance/sortable`}
                        asc={asc}
                        setAsc={setAsc}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <div className="flex flex-col neu-container">
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : repairItems?.length === 0 ? (
                            <NoRecordFound text="هیچ درخواست تعمیراتی موجود نیست." />
                        ) : (
                            repairItems?.map((item) => (
                                <div key={item.id} className="">
                                    <CorpRepairCard
                                        panelName={item.panel.name}
                                        panelPower={item.panel.power}
                                        owner={`${item.panel.customer.firstName} ${item.panel.customer.lastName}`}
                                        date={item.createdAt}
                                        status={item.status}
                                        UrgencyLevel={
                                            item.urgencyLevel.toLowerCase() as
                                                | "low"
                                                | "medium"
                                                | "high"
                                        }
                                        address={
                                            item.panel.address.streetAddress
                                        }
                                        className="w-full"
                                        onDetailsClick={() =>
                                            handleOpenDialog(item)
                                        }
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                paginationInfo={paginationInfo}
            />
            {isDialogOpen && (
                <CorpRepairDialog
                    isOpen={isDialogOpen}
                    onClose={handleCloseDialog}
                    repairItem={selectedItem}
                />
            )}
        </PageContainer>
    );
}
