"use client";
import React, { useEffect, useState } from "react";
import CorpRepairCard from "@/components/Repair/Corp/CorpRepairCard";
import CorpRepairDialog from "@/components/Repair/Corp/CorpRepairDialog";
import { CorpRepairItem } from "@/types/CorpTypes";
import getCorpRepairRecords from "@/src/services/getCorpRepairRecords";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import FilterSection from "@/components/FilterSection/FilterSection";
import { getData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";

export default function Page() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<CorpRepairItem | null>(
        null
    );
    const [repairItems, setRepairItems] = useState<CorpRepairItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [myRepairsFilter, setMyRepairsFilter] = useState<
    // 	"تایید شده" | "تمام شده" | "همه"
    // >("همه");
    // const [allRepairsFilter, setAllRepairsFilter] = useState<
    // 	"در انتظار تایید" | "رد شده" | "همه"
    // >("همه");
    const [status, setStatus] = useState<string>("7");
    const corpId = useSelector((state: RootState) => state.corp.id);

    useEffect(() => {
        setIsLoading(true);
        getData({
            endPoint: `/v1/corp/${2}/maintenance/request`,
            params: { status: status, corporationID: 2 },
        })
            .then((res) => {
                console.log(res?.data?.data);
                setRepairItems(res?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [corpId, status]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     console.log("corpId", corpId);
    //     getData({
    //         endPoint: `/v1/corp/${2}/maintenance/request`,
    //         params: { status: status1, corporationID: 2 },
    //     })
    //         .then((res) => {
    //             // console.log(res?.data?data);
    //             setRepairItems(res?.data?.data);
    //         })
    //         .catch((err) => console.log(err))
    //         .finally(() => setIsLoading(false));
    // }, [corpId, status1]);

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
