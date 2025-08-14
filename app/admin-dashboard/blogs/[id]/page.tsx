"use client";
import BlogEditor from "@/components/blog/BlogEditor/BlogEditor";
import BlogTopBox from "@/components/blog/BlogTopBox/BlogTopBox";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import { getData } from "@/src/services/apiHub";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
// import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;
    const { data, isLoading } = useQuery({
        queryKey: ["blog-title", id],
        queryFn: async () => {
            const res = await getData({ endPoint: `/v1/blog/${id}` });
            return res?.data;
        },
        enabled: !!id,
    });
    return (
        <PageContainer>
            <div className="flex flex-col justify-start items-center gap-2 p-5 pt-20 overflow-hidden rtl relative">
                <button
                    className="absolute left-4 top-6 flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => router.back()}
                    aria-label="بازگشت"
                >
                    <ChevronLeft size={30} />
                </button>
                {/* <div className="w-full text-center text-2xl font-bold mb-4">
                    {isLoading ? (
                        <Skeleton className="h-8 w-1/2 mx-auto" />
                    ) : (
                        data?.title ?? "بدون نام"
                    )}
                </div> */}
                <BlogTopBox
                    componentLoading={isLoading}
                    className="mb-4"
                    blogID={Number(id)}
                    title={data?.title ?? "بدون نام"}
                    description={data?.description ?? "بدون توضیحات"}
                    coverImage={data?.coverImage}
                    likeCount={data?.likeCount ?? 0}
                    createdAt={data?.createdAt ?? ""}
                    // likeAble={true}
                />
                <BlogEditor
                    className="max-w-full w-full"
                    blogID={id as string}
                    onlyView={true}
                />
            </div>
        </PageContainer>
    );
}
