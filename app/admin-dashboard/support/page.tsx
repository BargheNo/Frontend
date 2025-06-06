"use client";
import Tickets from "@/components/admin-dashboard/Tickets/Tickets";
import FilterSection from "@/components/CorpDashboard/FilterSection";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";
import React from "react";

export default function Page() {
	if (!useClientCheck()) {
		return <LoadingSpinner />;
	}
	return (
		<PageContainer>
			<Header header="تیکت‌ها" />
			<FilterSection />
			<Header header="تیکت‌های قبلی" className="mt-4" />
			<Tickets />
		</PageContainer>
	);
}
