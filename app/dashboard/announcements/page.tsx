"use client";
import dynamic from "next/dynamic";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";

const AnnounceView = dynamic(
    () => import("@/components/Announcement/AnnounceView/AnnounceView"),
    { ssr: false }
);

export default function page() {
    return (
        <PageContainer className="rtl my-24">
            <Header header="اخبار و اطلاعیه‌ها" className="rtl bg-red-500" />
            <AnnounceView onlyView={true} />
            {/* <AnnounceAddCard /> */}
        </PageContainer>
    );
}
