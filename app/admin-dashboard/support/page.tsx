"use client";
import Tickets from "@/components/admin-dashboard/Tickets/Tickets";
import FilterSection from "@/components/CorpDashboard/FilterSection";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";
import React from "react";

export default function Page() {
	if (!useClientCheck()) {
		return <LoadingSpinner />;
	}
	return (
		<PageContainer>
			{/* <div className="page"> */}
			<Header header="تیکت‌ها" />
			<FilterSection />
			<Tickets />
			{/* </div> */}
		</PageContainer>
	);
}
