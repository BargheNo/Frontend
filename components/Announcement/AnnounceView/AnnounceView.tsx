"use client";
import AnnouncementBox from "@/components/Announcement/AnnouncementBox/AnnouncementBox";
import AnnounceCard from "@/components/Announcement/AnnounceCard/AnnounceCard";
import { getData } from "@/src/services/apiHub";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { toast } from "sonner";

import Image from "next/image";
import panelNotFound from "@/public/images/panelNotFound/panelNotFound.png";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import AddAnnounce from "@/components/Announcement/AddAnnounce/AddAnnounce";
import FilterSection from "@/components/FilterSection/FilterSection";
import { Skeleton } from "@/components/ui/skeleton";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";

interface News {
    id: string;
    title: string;
    content: string;
    status: string;
    author: { firstName: string; lastName: string };
    createdAt: string;
}

export default function AnnounceView({
    onlyView = false,
    className,
    mode = "user",
}: {
    onlyView?: boolean;
    className?: string;
    mode?: "user" | "admin";
}) {
    const [pageSize, setPageSize] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("0");
    const statusList = [
        { id: 0, name: "همه" },
        { id: 1, name: "منتشر شده" },
        { id: 2, name: "پیش نویس" },
    ];
    //   const [news, setNews] = useState<News[]>([]);
    const { isLoading, data, error } = useQuery({
        queryKey: ["news", page, pageSize, query, asc, status],
        queryFn: async () => {
            if (onlyView) {
                const res = await getData({
                    endPoint: "/v1/news",
                    params: { page, pageSize, query, asc, status },
                });
                setPaginationInfo(res?.data?.pagination);
                return res;
            } else {
                const res = await getData({
                    endPoint: "/v1/admin/news",
                    params: { page, pageSize, query, asc, status },
                });
                // console.log("r1: ", r1);
                // const r2 = await getData({
                //     endPoint: "/v1/admin/news?status=1",
                // });
                // console.log("r2: ", r2);
                // r1.data?.data?.push(...r2?.data?.data);
                setPaginationInfo(res?.data?.pagination);
                return res;
            }
        },
    });

    useEffect(() => {
        if (error) {
            toast.error("مشکلی پیش آمده است");
        }
    }, [error]);

    return (
        <>
            {/* <div className="flex flex-row w-full items-center"> */}
            {!onlyView && <AddAnnounce />}
            {/* </div> */}
            {data?.data?.data?.length === 0 ? (
                <div className={cn("neu-container", className)}>
                    <NoRecordFound text="هیچ اطلاعیه‌ای یافت نشد." />
                </div>
            ) : (
                <>
                    <FilterSection
                        header="اخبار و اطلاعیه‌ها"
                        fieldName="status"
                        status={mode == "admin" ? status : undefined}
                        setStatus={mode == "admin" ? setStatus : undefined}
                        statusesList={mode == "admin" ? statusList : undefined}
                        query={query}
                        setQuery={setQuery}
                        // status={status}
                        // setStatus={setStatus}
                        // statusesListApiRoute={`/v1/news/status`}
                    />
                    <AnnouncementBox
                        onlyView={onlyView}
                        className={cn(
                            "bg-warm-white h-[60vh] w-full relative flex justify-between",
                            className
                        )}
                        insideClassName="gap-5"
                    >
                        {isLoading && <LoadingSpinner />}

                        {data?.data?.data?.map((item: News) => (
                            <AnnounceCard
                                onlyView={onlyView}
                                key={item.id}
                                id={item?.id}
                                title={item?.title}
                                status={item?.status}
                                date={item?.createdAt}
                                writer={`${item?.author?.firstName} ${item.author?.lastName}`}
                            />
                        ))}
                    </AnnouncementBox>
                    {isLoading ? (
                        <div className="flex justify-center items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded" />
                            <Skeleton className="h-8 w-8 rounded" />
                            <Skeleton className="h-8 w-8 rounded" />
                        </div>
                    ) : (
                        <CustomPagination
                            className="mb-0!"
                            setCurrentPage={setPage}
                            currentPage={page}
                            paginationInfo={paginationInfo}
                        />
                    )}
                </>
            )}
        </>
    );
}
