"use client";
import Panels from "@/components/admin-dashboard/Panels/Panels";
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
			{/* <div className="flex flex-col items-center gap-8 p-12 w-full bg-[#F0EDEF] min-h-[100vh]"> */}
				<Header header="کلیه سفارشات" />
				<FilterSection />
				<Panels />
			{/* </div> */}
		</PageContainer>
	);
}
