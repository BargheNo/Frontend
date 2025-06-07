"use client";

import React from "react";

import FilterSection from "@/components/CorpDashboard/FilterSection";
import Bids from "@/components/CorpDashboard/Bids/Bids";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

export default function Page() {
	return (
		<PageContainer>
			{/* <div className="min-h-full flex flex-col text-white py-8 px-14 bg-[#E9E7EB] gap-5"> */}
			<Header header="پیشنهادهای ارسال شده" />
			<FilterSection />
			<Bids />
			{/* </div> */}
		</PageContainer>
	);
}
