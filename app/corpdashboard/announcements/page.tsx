"use client";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import dynamic from "next/dynamic";
import React from "react";
const AnnounceView = dynamic(
    () => import("@/components/Announcement/AnnounceView/AnnounceView"),
    { ssr: false }
);
export default function Page() {
    return (
        <PageContainer>
            <Header header="اخبار و اطلاعیه‌ها" />
            <AnnounceView onlyView={true} />
        </PageContainer>
    );
}
