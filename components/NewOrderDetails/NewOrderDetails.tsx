import { getData } from "@/src/services/apiHub";
import React, { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import styles from "./styles.module.css";
import {
    CalendarDays,
    CircleDollarSign,
    Eclipse,
    MapPin,
    Building2,
    Route,
    Mail,
    Home,
    DoorOpen,
    Gauge,
    Building,
} from "lucide-react";

import wordExpression from "@/src/functions/Calculations";
import Header from "../Header/Header";
import FilterSection from "../FilterSection/FilterSection";
import CustomPagination from "../Custom/CustomPagination/CustomPagination";
import IconWithBackground from "../IconWithBackground/IconWithBackground";
import NoRecordFound from "../NoRecordFound/NoRecordFound";
import OrderBidCard from "./OrderBidCard";

interface Order {
    id: number;
    name: string;
    createdTime: string;
    status: string;
    powerRequest: number;
    maxCost: number;
    buildingType: string;
    address: Address;
}

export default function NewOrderDetails({ id }: { id: string }) {
    const [order, setOrder] = useState<Order>();
    const [bids, setBids] = useState<Bid[]>();
    const [loading, setLoading] = useState<boolean>(true);

    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);

    const fetchBids = useCallback(() => {
        setLoading(true);
        getData({ endPoint: `/v1/user/installation/request/${id}/bid` })
            .then((data) => {
                setBids(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [id]);

    const fetchOrderDetails = useCallback(() => {
        setLoading(true);
        getData({ endPoint: `/v1/user/installation/request/${id}` })
            .then((data) => {
                setOrder(data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchOrderDetails();
        fetchBids();
    }, [fetchBids, fetchOrderDetails]);

    return loading ? (
        <LoadingSpinner />
    ) : (
        <>
            <Header header="جزئیات درخواست" />
            <div className="relative neu-container p-4 flex flex-col gap-4">
                <div
                    className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} h-fit`}
                >
                    <h3 className="font-bold text-xl text-blue-800">
                        اطلاعات کلی
                    </h3>
                    <div className="space-y-4 p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex gap-2">
                                <Eclipse className="text-orange-400" />
                                <strong>نام پنل:</strong>
                                <p>{order?.name}</p>
                            </div>
                            <div className="flex gap-2">
                                <div
                                    className={`h-4 w-4 flex place-self-center rounded-full ${
                                        order?.status === "سپرده شده"
                                            ? "green"
                                            : order?.status === "فعال"
                                            ? "yellow"
                                            : order?.status === "منقضی"
                                            ? "orange"
                                            : "red"
                                    }-status shadow-md`}
                                />
                                <strong>وضعیت:</strong>
                                <p>{order?.status}</p>
                            </div>
                            <div className="flex gap-2">
                                <Building className="text-orange-400" />
                                <strong>نوع ساختمان:</strong>
                                <p>{order?.buildingType}</p>
                            </div>
                            <div className="flex gap-2">
                                <Gauge className="text-orange-400" />
                                <strong>توان درخواستی:</strong>
                                <p>
                                    {
                                        wordExpression(
                                            order?.powerRequest ?? "",
                                            true
                                        ).value
                                    }
                                    W
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <CircleDollarSign className="text-orange-400" />
                                <strong>حداکثر هزینه:</strong>
                                <p>
                                    {
                                        wordExpression(
                                            order?.maxCost ?? "",
                                            false
                                        ).value
                                    }
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <CalendarDays className="text-orange-400" />
                                <strong>تاریخ ایجاد:</strong>
                                <p>
                                    {new Date(
                                        String(order?.createdTime)
                                    ).toLocaleDateString("fa-IR")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} h-fit`}
                >
                    <h3 className="font-bold text-xl text-blue-800">آدرس</h3>
                    <div className="p-4 grid grid-cols-2 gap-4">
                        <div className="flex gap-2">
                            <MapPin className="text-orange-400" />
                            <strong>استان:</strong>
                            <p>{order?.address.province}</p>
                        </div>
                        <div className="flex gap-2">
                            <Building2 className="text-orange-400" />
                            <strong>شهر:</strong>
                            <p>{order?.address.city}</p>
                        </div>
                        <div className="flex gap-2">
                            <Route className="text-orange-400" />
                            <strong>خیابان:</strong>
                            <p>{order?.address.streetAddress}</p>
                        </div>
                        <div className="flex gap-2">
                            <Mail className="text-orange-400" />
                            <strong>کد پستی:</strong>
                            <p>{order?.address.postalCode}</p>
                        </div>
                        <div className="flex gap-2">
                            <Home className="text-orange-400" />
                            <strong>پلاک:</strong>
                            <p>{order?.address.houseNumber}</p>
                        </div>
                        <div className="flex gap-2">
                            <DoorOpen className="text-orange-400" />
                            <strong>واحد:</strong>
                            <p>{order?.address.unit}</p>
                        </div>
                    </div>
                </div>
            </div>
            <FilterSection
                fieldName="پیشنهاد"
                header="پیشنهادات"
                resultPerPage={resultPerPage}
                setResultPerPage={setResultPerPage}
                setPage={setPage}
                columnsListApiRoute={`/v1/bid/sortable`}
                sortBy={sortBy}
                setSortBy={setSortBy}
                asc={asc}
                setAsc={setAsc}
            />

            <div className="relative neu-container flex flex-col gap-4">
                {bids && bids.length > 0 ? (
                    bids?.map((bid, index) => (
                        <OrderBidCard
                            fetchBids={fetchBids}
                            key={index}
                            orderId={id}
                            bid={bid}
                        />
                        // <div
                        //     key={index}
                        //     className={`w-full min-h-64 border-t-1 border-gray-300 first:border-t-0`}
                        // >
                        //     <div className="flex flex-row justify-between w-full min-h-64 bg-[#F0EDEF] overflow-hidden relative">
                        //         <div className="flex md:flex-row flex-col justify-between w-full min-h-64">
                        //             <div className="w-4/5 flex flex-col justify-between p-4 h-full">
                        //                 <Item
                        //                     icon={Battery}
                        //                     fieldName="ظرفیت پیشنهادی"
                        //                     fieldValue={bid?.power}
                        //                     prefix="W"
                        //                     english={true}
                        //                 />
                        //                 <Item
                        //                     icon={CalendarRange}
                        //                     fieldName="زمان تخمینی نصب"
                        //                     fieldValue={DateConverter(
                        //                         bid?.installationTime
                        //                     )}
                        //                     english={true}
                        //                 />
                        //                 <Item
                        //                     icon={DollarSign}
                        //                     fieldName="قیمت پیشنهادی"
                        //                     fieldValue={bid?.cost}
                        //                     prefix="تومان"
                        //                 />
                        //             </div>
                        //             <div className="flex md:flex-col flex-row justify-evenly w-1/5 items-center text-center md:-mr-0 mr-6 md:gap-0 gap-28 md:mb-0 mb-10">
                        //                 <div className="text-nowrap flex flex-col  md:ml-2 ml-auto items-center justify-center gap-2 md:p-3 p-5 rounded-2xl bg-[#F0F0F3] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)] w-30">
                        //                     <div
                        //                         className={`h-4 w-4 rounded-full ${getStatusColor(
                        //                             bid?.status
                        //                         )} shadow-md`}
                        //                     />
                        //                     <span className="text-sm font-medium text-gray-600">
                        //                         {bid?.status}
                        //                     </span>
                        //                 </div>
                        //                 <Dialog
                        //                     open={open}
                        //                     onOpenChange={setOpen}
                        //                 >
                        //                     <DialogTrigger asChild>
                        //                         <div className="flex flex-col items-center gap-2 md:mr-0 -mr-5 text-nowrap">
                        //                             <div className="bg-gradient-to-b from-[#EE4334] to-[#D73628] rounded-full w-16 h-16 flex items-center place-content-center text-white cursor-pointer shadow-md hover:shadow-lg transition duration-300 hover:scale-105">
                        //                                 <ArrowLeft />
                        //                             </div>
                        //                             <span>مشاهده جزئیات</span>
                        //                         </div>
                        //                     </DialogTrigger>
                        //                     <DialogContent
                        //                         style={{
                        //                             backgroundColor: "#F1F4FC",
                        //                         }}
                        //                         className="w-full max-h-[90vh] no-scrollbar mx-auto overflow-auto rtl dialog-width"
                        //                     >
                        //                         <DialogHeader>
                        //                             <DialogTitle className="flex justify-center items-end font-bold mt-3.5">
                        //                                 جزئیات پیشنهاد
                        //                             </DialogTitle>
                        //                         </DialogHeader>
                        //                         <div className="flex flex-col gap-2">
                        //                             <span className="text-lg font-bold place-self-start">
                        //                                 مشخصات درخواست
                        //                             </span>
                        //                             <div className={styles.Box}>
                        //                                 <div className="grid grid-cols-1 sm:grid-cols-2">
                        //                                     <DialogItem
                        //                                         icon={
                        //                                             CircleDollarSign
                        //                                         }
                        //                                         fieldName="حداکثر هزینه"
                        //                                         fieldValue={
                        //                                             bid?.cost
                        //                                         }
                        //                                         english={false}
                        //                                         prefix=" تومان"
                        //                                     />
                        //                                     <DialogItem
                        //                                         icon={Battery}
                        //                                         fieldName="ظرفیت پیشنهادی"
                        //                                         fieldValue={
                        //                                             bid?.power
                        //                                         }
                        //                                         english={true}
                        //                                         prefix="W"
                        //                                     />
                        //                                     <DialogItem
                        //                                         icon={
                        //                                             CalendarRange
                        //                                         }
                        //                                         fieldName="زمان تخمینی نصب"
                        //                                         fieldValue={DateConverter(
                        //                                             bid?.installationTime
                        //                                         )}
                        //                                     />
                        //                                     <DialogItem
                        //                                         icon={LandPlot}
                        //                                         fieldName="مساحت"
                        //                                         fieldValue={
                        //                                             bid?.area
                        //                                         }
                        //                                         prefix=" متر مربع"
                        //                                     />
                        //                                     <DialogItem
                        //                                         icon={
                        //                                             ShieldCheck
                        //                                         }
                        //                                         fieldName="گارانتی"
                        //                                         fieldValue={
                        //                                             bid
                        //                                                 ?.guarantee
                        //                                                 ?.name ??
                        //                                             "بدون گارانتی"
                        //                                         }
                        //                                     />
                        //                                     <DialogItem
                        //                                         icon={
                        //                                             CreditCard
                        //                                         }
                        //                                         fieldName="شرایط پرداخت"
                        //                                         fieldValue={
                        //                                             bid
                        //                                                 ?.paymentTerms
                        //                                                 ?.paymentMethod
                        //                                         }
                        //                                     />
                        //                                 </div>
                        //                                 {/* <DialogItem
                        //                                     className="border-t-2"
                        //                                     icon={FileText}
                        //                                     fieldName="توضیحات"
                        //                                     fieldValue={
                        //                                         bid?.description
                        //                                     }
                        //                                 /> */}
                        //                             </div>
                        //                             <p>
                        //                                 <span className="font-bold">
                        //                                     توضیحات:{" "}
                        //                                 </span>
                        //                                 <span>
                        //                                     {bid?.description}
                        //                                 </span>
                        //                             </p>
                        //                         </div>
                        //                         {bid?.status ===
                        //                             "در انتظار تایید" && (
                        //                             <DialogFooter className="flex justify-between w-full">
                        //                                 <CancelButton />
                        //                                 <div className="flex gap-2">
                        //                                     <Button
                        //                                         className="gradient-red w-full"
                        //                                         onClick={() =>
                        //                                             rejectBid(
                        //                                                 bid?.id
                        //                                             )
                        //                                         }
                        //                                     >
                        //                                         {rejectLoading ? (
                        //                                             <LoadingOnButton />
                        //                                         ) : (
                        //                                             <p className="w-full">
                        //                                                 رد
                        //                                                 پیشنهاد
                        //                                             </p>
                        //                                         )}
                        //                                     </Button>
                        //                                     <Button
                        //                                         className="gradient-green w-full"
                        //                                         onClick={() =>
                        //                                             acceptBid(
                        //                                                 bid?.id
                        //                                             )
                        //                                         }
                        //                                     >
                        //                                         {acceptLoading ? (
                        //                                             <LoadingOnButton />
                        //                                         ) : (
                        //                                             <p className="w-full">
                        //                                                 پذیرش
                        //                                                 پیشنهاد
                        //                                             </p>
                        //                                         )}
                        //                                     </Button>
                        //                                 </div>
                        //                             </DialogFooter>
                        //                         )}
                        //                     </DialogContent>
                        //                 </Dialog>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div>
                    ))
                ) : (
                    <NoRecordFound text="هیچ پیشنهادی یافت نشد." />
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

const Item = ({
    icon: Icon,
    fieldName,
    fieldValue,
    smallValue = false,
    prefix,
    english = false,
}: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    fieldName: string;
    fieldValue: string | number;
    smallValue?: boolean;
    prefix?: string;
    english?: boolean;
}) => {
    const { value, changed } = wordExpression(fieldValue, english);
    return (
        <div className="flex my-2 h-full gap-3 place-items-center">
            <div className="flex items-start">
                <IconWithBackground icon={Icon} />
            </div>
            <div className="flex flex-col sm:flex-row gap-1 items-start">
                <span
                    className={`text-nowrap ${
                        smallValue ? "text-xl" : "text-xl mt-[2px]"
                    }`}
                >
                    {fieldName}:{" "}
                </span>
                <span
                    dir={english ? "ltr" : "rtl"}
                    className={`text-black ${
                        smallValue ? "mt-[3px]" : "font-bold md:text-xl text-l"
                    }`}
                >
                    {value}
                    {changed && english ? "" : " "}
                    {prefix}
                </span>
            </div>
        </div>
    );
};

const DialogItem = ({
    icon: Icon,
    fieldName,
    fieldValue,
    english = false,
    prefix,
    className,
}: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    fieldName: string;
    fieldValue: string | number;
    english?: boolean;
    prefix?: string;
    className?: string;
}) => {
    const { value, changed } = wordExpression(fieldValue, english);
    return (
        <div
            className={`flex items-start gap-2 border-t-2 first:border-t-0 sm:[*:nth-child(2)]:border-t-0 border-gray-300 w-full py-2 ${className}`}
        >
            <Icon className="min-w-6 min-h-6 transition-transform duration-200 hover:scale-115 text-[#FA682D]" />
            <div className="flex gap-1">
                <span>{fieldName}: </span>
                <span className="text-[#5E5E5E]">
                    {value}
                    {changed && english ? "" : " "}
                    {prefix}
                </span>
            </div>
        </div>
    );
};
