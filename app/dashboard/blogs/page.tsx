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

const Header = nextDynamic(() => import("@/components/Header/Header"), {
    ssr: false,
});

const LoadingSpinner = nextDynamic(
    () => import("@/components/Loading/LoadingSpinner/LoadingSpinner"),
    {
        ssr: false,
    }
);
import { getData } from "@/src/services/apiHub";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";

export default function Page() {
    const corpID = useSelector((state: any) => state.user.corpId);
    const { isLoading, data, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const r1 = await getData({
                endPoint: `/v1/blog`,
            });
            console.log("r1: ", r1);
            return r1;
        },
    });
    return (
        <PageContainer>
            {isLoading && <LoadingSpinner />}

            {!isLoading && (
                <>
                    <Header header="مطالب" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-[2vw] w-full mx-auto">
                        {data?.data?.data?.map((blog: Blog) => {
                            return (
                                <BlogCard
                                    key={blog.id}
                                    blogID={String(blog.id)}
                                    imageUrl={blog.coverImage}
                                    title={blog.title}
                                    description={blog.description}
                                    writer={
                                        blog.author ?? blog.corporation?.name
                                    }
                                    date={blog.createdAt}
                                    likeCount={blog.likeCount}
                                    status={blog.status}
                                    viewOnly={true}
                                    className="w-[70vw] md:w-[40vw] mx-auto"
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </PageContainer>
    );
}
