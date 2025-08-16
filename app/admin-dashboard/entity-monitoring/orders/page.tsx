"use client";
import Ordercard from "@/components/Entity-Monitoring/Orders/order-card";
import Header from "@/components/Header/Header";
import { Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, { useCallback, useEffect, useState } from "react";
import SignupButton from "@/components/SignupButton/SignupButton";
import style from "./style.module.css";
import { getOrder } from "@/src/types/Entity-Monitoring/orderType";
import OrderService from "@/src/services/entityMonitoringOrder";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { getData } from "@/src/services/apiHub";
import { CustomTable } from "@/components/Custom/CustomTable/CustomTable";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import FilterSection from "@/components/FilterSection/FilterSection";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";

export default function Orders() {
    const [orderlist, setOrderList] = useState<getOrder[]>([]);
    const [status, setStatus] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);
    // const [totalPages, setTotalPages] = useState<number>(0);
    const fetchOrders = useCallback(() => {
        setLoading(true);
        getData({
            endPoint: `/v1/admin/installation/request`,
            params: { status, pageSize, query, page, sortBy, asc },
        })
            .then((res) => {
                console.log(res?.data);
                setOrderList(res?.data?.data);
                setPaginationInfo(res?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [status, query, pageSize, page, sortBy, asc]);
    useEffect(() => {
        fetchOrders();
        // getData({
        //     endPoint: `/v1/admin/installation/request`,
        //     params: { status, pageSize: 10000000 },
        // })
        //     .then((res) => {
        //         console.log(res?.data);
        //         setOrderList(res?.data?.data);
        //         setPaginationInfo(res?.data?.pagination);
        //     })
        //     .catch((err) => console.log(err))
        //     .finally(() => setLoading(false));
    }, [fetchOrders]);

    const meta = {
        name: { label: "نام" },
        status: { label: "وضعیت" },
        buildingType: { label: "نوع ساختمان" },
        powerRequest: { label: "برق مورد نیاز" },
        maxCost: { label: "سقف هزینه" },
        customer: { label: "متقاضی", fields: ["firstName", "lastName"] },
    };
    return (
        <PageContainer>
            <FilterSection
                header="سابقه سفارشات"
                statusesListApiRoute={`/v1/installation/request/status`}
                fieldName="درخواست"
                status={status}
                setStatus={setStatus}
                resultPerPage={pageSize}
                setResultPerPage={setPageSize}
                setPage={setPage}
                query={query}
                setQuery={setQuery}
                onSearchSubmit={() => fetchOrders()}
                columnsListApiRoute={`/v1/installation/request/sortable`}
                asc={asc}
                setAsc={setAsc}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            {loading ? (
                <div className="neu-container">
                    <LoadingSpinner />
                </div>
            ) : (
                <CustomTable
                    data={orderlist}
                    meta={meta}
                    loading={loading}
                    page={page ?? 1}
                    setPage={setPage}
                    pageSize={pageSize !== "" ? pageSize : "10"}
                    deleteApiUrl={`/v1/admin/installation/request/:id`}
                    fetchData={fetchOrders}
                    updateApiUrl={`/v1/admin/installation/request/:id`}
                />
            )}
            <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                paginationInfo={paginationInfo}
            />
            {/* <>
                <div className="flex flex-col mt-10">
                    <Header className="px-20" header="سفارش‌ها" />
                </div>

                <div className="border-b-1 border-gray-300 py-4 relative">
                    <div className="flex flex-row items-end">
                        <Select
                            name="order status"
                            onValueChange={(
                                value: keyof typeof orderStatusTypeMap
                            ) => {
                                const id = orderStatusTypeMap[value];
                                if (id) setStatus(Number(id));
                            }}
                        >
                            <SelectTrigger
                                className={`${style.CustomInput} bg-warm-white px-6 mr-20 mt-[27px] min-h-[43px] cursor-pointer`}
                            >
                                <SelectValue placeholder="وضعیت سفارش" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>وضعیت سفارش</SelectLabel>
                                    <SelectItem
                                        value="active"
                                        className="cursor-pointer"
                                    >
                                        فعال
                                    </SelectItem>
                                    <SelectItem
                                        value="cancled"
                                        className="cursor-pointer"
                                    >
                                        لغو شده
                                    </SelectItem>
                                    <SelectItem
                                        value="expired"
                                        className="cursor-pointer"
                                    >
                                        منقضی
                                    </SelectItem>
                                    <SelectItem
                                        value="deposited"
                                        className="cursor-pointer"
                                    >
                                        سپرده شده
                                    </SelectItem>
                                    <SelectItem
                                        value="all"
                                        className="cursor-pointer"
                                    >
                                        همه
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="w-[91%] m-auto border-gray-300 px-10 py-5 rounded-xl relative">
                    <div className="flex flex-row justify-between items-center w-full rtl text-gray-500">
                        <div className="flex w-full justify-between text-center">
                            <span className="w-[16%] flex justify-center">
                                نام مشتری
                            </span>
                            <span className="w-[16%] flex justify-center">
                                نام پنل
                            </span>
                            <span className="w-[16%] flex justify-center">
                                وضعیت سفارش
                            </span>
                            <span className="w-[16%] flex justify-center">
                                سقف هزینه
                            </span>
                            <span className="w-[16%] flex justify-center">
                                توان مصرفی
                            </span>
                            <span className="w-[20%] flex justify-center">
                                مساحت
                            </span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : orderlist && orderlist.length > 0 ? (
                    <div className="rounded-xl overflow-hidden w-[90%] m-auto relative">
                        {orderlist.map((Item, index) => (
                            <Ordercard
                                id={Item.id}
                                key={index}
                                customer={Item.customer}
                                status={Item.status}
                                maxCost={Item.maxCost}
                                area={Item.area}
                                name={Item.name}
                                powerRequest={Item.powerRequest}
                                buildingType={Item.buildingType}
                                address={Item.address}
                                description={Item.description}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col m-auto justify-center font-bold self-center text-center mt-20">
                        <p className="m-auto text-navy-blue">
                            سفارشی یافت نشد.
                        </p>
                    </div>
                )}
            </> */}
        </PageContainer>
    );
}
