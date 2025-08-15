"use client";
export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";

const BlogCard = nextDynamic(
    () => import("@/components/blog/BlogCard/BlogCard"),
    {
        ssr: false,
    }
);
const PageContainer = nextDynamic(
    () => import("@/components/Dashboard/PageContainer/PageContainer"),
    {
        ssr: false,
    }
);
// const Header = nextDynamic(() => import("@/components/Header/Header"), {
//     ssr: false,
// });
import { getData } from "@/src/services/apiHub";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import panelNotFound from "@/public/images/panelNotFound/panelNotFound.png";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";
import { set } from "cypress/types/lodash";
import FilterSection from "@/components/FilterSection/FilterSection";

export default function Page() {
    const [pageSize, setPageSize] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const { isLoading, data } = useQuery({
        queryKey: ["blogs", page, query, asc],
        queryFn: async () => {
            const res = await getData({
                endPoint: `/v1/blog`,
                params: {
                    page,
                    pageSize,
                    query,
                    asc,
                },
            });
            console.log(res.data.pagination);
            setPaginationInfo(res.data.pagination);
            return res;
        },
    });
    const blogs = data?.data?.data;
    return (
        <PageContainer className="mt-16 rtl">
            {/* <Header header="مطالب" /> */}
            <FilterSection
                // fieldName=""
                header="مطالب"
                // statusesListApiRoute=""
                // columnsListApiRoute=""
                // status=""
                // setStatus
                // sortBy=""
                // setSortBy={setSortBy}
                // resultPerPage=""
                // setResultPerPage={setResultPerPage}
                query=""
                setQuery={setQuery}
                // onSearchSubmit={onSearchSubmit}
                // resultPerPages={resultPerPages}
                // setPage={setPage}
                asc={asc}
                setAsc={setAsc}
                initialLoadingDefault={false}
                // statusesList={statusesList}
            />
            {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-[2vw] w-full mx-auto mt-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-4 p-4 rounded-lg bg-white shadow"
                        >
                            <Skeleton className="h-40 w-full rounded-md" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <div className="flex gap-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : Array.isArray(blogs) && blogs.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-[2vw] w-full mx-auto">
                        {blogs.map((blog: Blog) => {
                            let writer = "ناشناس";
                            if (blog?.author) {
                                if (typeof blog.author === "string") {
                                    writer = blog.author;
                                } else if (
                                    blog.author.firstName &&
                                    blog.author.lastName
                                ) {
                                    writer = `${blog.author.firstName} ${blog.author.lastName}`;
                                }
                            } else if (blog?.corporation?.name) {
                                writer = blog.corporation.name;
                            }
                            return (
                                <BlogCard
                                    key={blog.id}
                                    blogID={String(blog.id)}
                                    imageUrl={blog.coverImage}
                                    title={blog.title}
                                    description={blog.description}
                                    writer={writer}
                                    date={blog.createdAt}
                                    likeCount={blog.likeCount}
                                    status={blog.status}
                                    viewOnly={true}
                                    className="mx-auto"
                                />
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center w-full py-8 bg-warm-white neu-card rounded-xl z-30">
                    <Image
                        src={panelNotFound}
                        alt="No blogs found"
                        width={256}
                        height={256}
                        className="w-[60%] h-[60%] object-contain mb-4"
                    />
                    <span className="text-lg text-gray-500">
                        هیچ مطلبی یافت نشد
                    </span>
                </div>
            )}
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                </div>
            ) : (
                <CustomPagination
                    setCurrentPage={setPage}
                    currentPage={page}
                    paginationInfo={paginationInfo}
                />
            )}
        </PageContainer>
    );
}
