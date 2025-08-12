"use client";
export const dynamic = "force-dynamic";
import nextDynamic from "next/dynamic";

import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";


const AnnounceView = nextDynamic(
    () => import("@/components/Announcement/AnnounceView/AnnounceView"),
    { ssr: false }
);

export default function page() {
    return (
        <PageContainer>
            <Header header="اخبار و اطلاعیه‌ها" />
            <AnnounceView onlyView={true} />
            {/* <AnnounceAddCard /> */}
        </PageContainer>
    );
}
