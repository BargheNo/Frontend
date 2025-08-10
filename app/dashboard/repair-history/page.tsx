"use client";

import { useState, useEffect } from "react";
import Carousel from "@/components/Slider/Slider";

import CustomerRepairCard from "@/components/Repair/Customer/CustomerRepairCard";
import CustomerRepairRequest from "@/components/Repair/Customer/CustomerRepairRequest";
import RepairDetailsDialog from "@/components/Repair/Customer/CustomerRepairDialog";

import { baseURL, getData } from "@/src/services/apiHub";
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
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";

interface RepairHistoryItem {
    id: number;
    createdAt: string;
    panel: {
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
        corporation: {
            id: number;
            name: string;
            logo: string;
            contactInfo: ContactInfo[];
            addresses: Address[];
        };
        address: Address;
        guarantee: {
            id: number;
            name: string;
            status: string;
            guaranteeType: string;
            durationMonths: number;
            description: string;
            terms: Record<string, unknown>;
        };
    };
    corporation: {
        id: number;
        name: string;
        logo: string;
        contactInfo: ContactInfo[];
        addresses: Address[];
    };
    subject: string;
    description: string;
    urgencyLevel: string;
    status: string;
    isGuaranteeRequested: boolean;
    record: {
        id: number;
        createdAt: string;
        title: string;
        details: string;
        date: string;
        isApproved: boolean;
        violation: {
            reason: string;
            details: string;
        };
    };
}

interface ContactInfo {
    type: string;
    value: string;
}

interface Address {
    id: number;
    province: string;
    provinceID: number;
    cityID: number;
    city: string;
    streetAddress: string;
    postalCode: string;
    houseNumber: string;
    unit: number;
}

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<RepairHistoryItem | null>(
        null
    );
    const [repairItems, setRepairItems] = useState<RepairHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    // const [statuses, setStatuses] = useState<status[] | null>(null);
    const [status, setStatus] = useState<string>("");
    const [resultPerPage, setResultPerPage] = useState<string>("");

    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);
    // Function to filter repairs since the last month
    const getRecentRepairs = (items: RepairHistoryItem[]) => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        return items.filter((item) => {
            const repairDate = new Date(item.createdAt);
            return repairDate >= oneMonthAgo;
        });
    };

    useEffect(() => {
        setIsLoading(true);
        getData({
            endPoint: `/v1/user/maintenance/request`,
            params: { status, page, sortBy, asc, pageSize: resultPerPage },
        })
            .then((data) => {
                setRepairItems(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [refreshTrigger, status, resultPerPage, page, sortBy, asc]);

    const handleOpenDialog = (item: RepairHistoryItem) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    // Function to close the dialog
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedItem(null);
    };

    // Function to trigger refresh
    const triggerRefresh = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    const recentRepairs = getRecentRepairs(repairItems);
    const sliderItems = recentRepairs.map((item: RepairHistoryItem) => ({
        text: item.subject,
        date: item.createdAt,
    }));
    return (
        <PageContainer>
            {/* <div className="min-h-full w-full flex flex-col gap-8 text-white py-8 px-3 md:px-14 bg-transparent" dir='rtl'> */}
            <Header header="درخواست تعمیرات" />
            <div className="flex flex-col-reverse md:flex-row">
                {sliderItems.length > 0 ? (
                    <>
                        <div className="w-full md:w-[60%] h-60 items-center content-center">
                            <Carousel
                                items={sliderItems}
                                onItemClick={(index: number) =>
                                    handleOpenDialog(recentRepairs[index])
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-4 w-full md:w-[40%] items-center align-center justify-center mb-8 md:mt-0">
                            <CustomerRepairRequest onRefresh={triggerRefresh} />
                        </div>
                    </>
                ) : (
                    <div className="w-full flex justify-center">
                        <CustomerRepairRequest onRefresh={triggerRefresh} />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-4">
                <FilterSection
                    header="سوابق تعمیرات"
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
                {isLoading ? (
                    <div className="relative">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className="flex flex-col neu-container">
                        {repairItems.length === 0 ? (
                            <NoRecordFound text="هیچ سابقه تعمیراتی موجود نیست." />
                        ) : (
                            repairItems.map(
                                (item: RepairHistoryItem, index: number) => (
                                    <div key={item.id || index}>
                                        <CustomerRepairCard
                                            repairItem={item}
                                            onDetailsClick={() =>
                                                handleOpenDialog(item)
                                            }
                                        />
                                    </div>
                                )
                            )
                        )}
                    </div>
                )}
            </div>
            <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                paginationInfo={paginationInfo}
            />
            <RepairDetailsDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                repairItem={selectedItem}
                onRefresh={triggerRefresh}
            />
        </PageContainer>
    );
};

export default Page;
