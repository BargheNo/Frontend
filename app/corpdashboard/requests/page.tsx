"use client";

import Requests from "@/components/CorpDashboard/Requests/Requests";
import FilterSection from "@/components/CorpDashboard/FilterSection";
import React from "react";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

export default function Page() {
	return (
		<PageContainer>
			<Header header="درخواست‌های موجود در سرتاسر سامانه" />
			<Requests />
		</PageContainer>
	);
}
