import CorpStaff from "@/components/CorpStaff/CorpStaff";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import React from "react";

export default function page() {
	return <PageContainer>
		{/* <Header header="مدیریت اعضای شرکت" /> */}
		<CorpStaff />
	</PageContainer>
}
