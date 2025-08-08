"use client";

export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";

const AddBlog = nextDynamic(() => import("@/components/blog/AddBlog/AddBlog"), {
    ssr: false,
});
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
    const corpID = useSelector((state: RootState) => state.user.corpId);
    const { isLoading, data } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const r1 = await getData({
                endPoint: `/v1/corp/${corpID}/blog/list?status=1`,
            });
            console.log("r1: ", r1);
            const r2 = await getData({
                endPoint: `/v1/corp/${corpID}/blog/list?status=2`,
            });
            console.log("r2: ", r2);
            r1.data?.push(...r2.data);
            return r1;
        },
    });
    const blogs = data?.data;
    return (
        <PageContainer>
            <AddBlog />
            <Header header="مطالب" />
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-[2vw] w-full mx-auto">
                    {blogs?.map((blog: Blog) => (
                        <BlogCard
                            key={blog?.id}
                            blogID={String(blog?.id)}
                            imageUrl={blog?.cover_image}
                            title={blog?.title}
                            description={blog?.description}
                            writer={blog?.author}
                            date={blog?.created_at}
                            likeCount={blog?.like_count}
                            status={blog?.status}
                            viewOnly={false}
                            className="w-[70vw] md:w-[40vw] mx-auto"
                        />
                    ))}
                </div>
            )}
        </PageContainer>
    );
}
