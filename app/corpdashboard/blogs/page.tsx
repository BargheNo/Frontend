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

import { getData } from "@/src/services/apiHub";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import panelNotFound from "@/public/images/panelNotFound/panelNotFound.png";

export default function Page() {
    const corpID = useSelector((state: RootState) => state.user.corpId);
    const { isLoading, data } = useQuery({
        queryKey: ["blogs", corpID],
        queryFn: async () => {
            const r1 = await getData({
                endPoint: `/v1/corp/${corpID}/blog/list?status=1`,
            });
            // console.log("r1: ", r1.data?.data);
            const r2 = await getData({
                endPoint: `/v1/corp/${corpID}/blog/list?status=2`,
            });
            // console.log("r2: ", r2?.data?.data);
            r1.data?.data?.push(...r2?.data?.data);
            return r1;
        },
        enabled: !!corpID,
    });
    console.log(data?.data?.data);
    const blogs = data?.data?.data;
    return (
        <PageContainer>
            <AddBlog />
            <Header header="مطالب" />
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
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-[2vw] w-full mx-auto">
                    {blogs.map((blog: Blog) => (
                        <BlogCard
                            key={blog.id}
                            blogID={String(blog.id)}
                            imageUrl={blog.coverImage}
                            title={blog.title}
                            description={blog.description}
                            writer={
                                typeof blog?.author === "string"
                                    ? blog?.author
                                    : blog?.author
                                    ? `${blog.author.firstName} ${blog.author.lastName}`
                                    : "ناشناس"
                            }
                            date={blog.createdAt}
                            likeCount={blog.likeCount}
                            status={blog.status}
                            viewOnly={false}
                            className="mx-auto"
                        />
                    ))}
                </div>
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
        </PageContainer>
    );
}
