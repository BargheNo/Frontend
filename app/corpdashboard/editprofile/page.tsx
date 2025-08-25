import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import CorpProfile from "@/components/Profile/CorpProfile/CorpProfile";
import React from "react";

export default function page() {
    return (
        <PageContainer>
            <Header header="ویرایش اطلاعات" />
			<CorpProfile />
        </PageContainer>
    );
}
