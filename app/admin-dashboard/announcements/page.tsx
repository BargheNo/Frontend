"use client";
// import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";

export const dynamic = "force-dynamic";
import nextDynamic from "next/dynamic";

const AnnounceView = nextDynamic(
    () => import("@/components/Announcement/AnnounceView/AnnounceView"),
    { ssr: false }
);

import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
export default function page() {
    return (
        <PageContainer>
            <AnnounceView mode="admin" />
        </PageContainer>
    );
}
