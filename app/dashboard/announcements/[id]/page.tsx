"use client";
export const dynamic = "force-dynamic";
import nextDynamic from "next/dynamic";
import { ChevronLeft } from "lucide-react";
// import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

const AnnounceEditor = nextDynamic(
    () => import("@/components/Announcement/AnnounceEditor/AnnounceEditor"),
    { ssr: false }
);

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;
    return (
        <PageContainer className="vazir">
            <div className="flex flex-col justify-start items-center gap-2 p-5 pt-20 overflow-hidden rtl relative">
                <button
                    className="absolute left-4 top-6 flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => router.back()}
                    aria-label="بازگشت"
                >
                    <ChevronLeft size={30} />
                </button>
                <AnnounceEditor
                    className="max-w-full w-full"
                    newsID={id as string}
                    onlyView={true}
                />
            </div>
        </PageContainer>
    );
}
