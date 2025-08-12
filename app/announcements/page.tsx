import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import React from "react";

export default function page() {
    return (
        <PageContainer className="rtl py-24">
            <Header header="اخبار و اطلاعیه‌ها" />
            <AnnounceView onlyView={true} />
            {/* <AnnounceAddCard /> */}
        </PageContainer>
    );
}
