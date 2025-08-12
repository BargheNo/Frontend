"use client";
import { ChevronLeft } from "lucide-react";
export const dynamic = "force-dynamic";
import { useParams, useRouter } from "next/navigation";
import nextDynamic from "next/dynamic";
const AnnounceEditor = nextDynamic(
    () => import("@/components/Announcement/AnnounceEditor/AnnounceEditor"),
    { ssr: false }
);

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;
    return (
        <div className="flex flex-col justify-center items-center gap-2 p-3 m-10 overflow-hidden rtl z-20">
            <ChevronLeft
                className="self-end text-gray-600 hover:cursor-pointer z-30"
                size={33}
                onClick={() => router.back()}
            />
            <AnnounceEditor newsID={id as string} onlyView={true} />
        </div>
    );
}
