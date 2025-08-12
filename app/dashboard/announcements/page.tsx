"use client";
import dynamic from "next/dynamic";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

const AnnounceView = dynamic(
    () => import("@/components/Announcement/AnnounceView/AnnounceView"),
    { ssr: false }
);

export default function page() {
    return (
        <PageContainer>
            {/* <Header header="اخبار و اطلاعیه‌ها" /> */}
            <AnnounceView onlyView={true} />
            {/* <AnnounceAddCard /> */}
        </PageContainer>
    );
}
