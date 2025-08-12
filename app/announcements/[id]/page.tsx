"use client";
export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import { ChevronLeft } from "lucide-react";
const AnnounceEditor = nextDynamic(
    () => import("@/components/Announcement/AnnounceEditor/AnnounceEditor"),
    { ssr: false }
);
// import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;
    return (
        <PageContainer>
            <div className="flex flex-col justify-center items-center gap-2 p-3 md:pt-20 overflow-hidden rtl z-30">
                <ChevronLeft
                    className="self-end ml-8 text-gray-600 cursor-pointer"
                    size={30}
                    onClick={() => router.back()}
                />
                <AnnounceEditor newsID={id as string} onlyView={true} />
            </div>
        </PageContainer>
    );
}
