"use client";

import React from "react";

import FilterSection from "@/components/CorpDashboard/FilterSection";
import Bids from "@/components/CorpDashboard/Bids/Bids";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

export default function Page() {
	return (
		<PageContainer>
			<Header header="پیشنهادهای ارسال شده" />
			{/* <FilterSection /> */}
			<Bids />
		</PageContainer>
	);
}
