"use client";
import BlogEditor from "@/components/blog/BlogEditor/BlogEditor";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/src/services/apiHub";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

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
            <div className="flex flex-col justify-start items-center gap-2 p-5 pt-20 overflow-hidden rtl h-[80vh] relative">
                <button
                    className="absolute left-4 top-6 flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => router.back()}
                    aria-label="بازگشت"
                >
                    <ChevronLeft size={30} />
                    {/* <span className="hidden sm:inline text-base font-medium">
                    بازگشت
                </span> */}
                </button>
                <div className="w-full text-center text-2xl font-bold mb-4">
                    {isLoading ? (
                        <Skeleton className="h-8 w-1/2 mx-auto" />
                    ) : (
                        data?.title ?? "بدون نام"
                    )}
                </div>
                <BlogEditor blogID={id as string} onlyView={true} />
            </div>
        </PageContainer>
    );
}
