import { CustomTable } from "@/components/Custom/CustomTable/CustomTable";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import React from "react";

export default function page() {
    return (
        <PageContainer>
            <Header header="مدیریت درخواست‌ها"/>
            {/* <CustomTable /> */}
        </PageContainer>
    );
}
