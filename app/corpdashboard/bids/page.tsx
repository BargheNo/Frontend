"use client";

import React from "react";

import FilterSection from "@/components/CorpDashboard/FilterSection";
import Bids from "@/components/CorpDashboard/Bids/Bids";

export default function Page() {
	return (
		<div className="min-h-full flex flex-col text-white py-8 px-14 bg-[#E9E7EB] gap-5">
			<h1 className="text-[#003a8b] text-3xl mb-6 font-black">
				پیشنهادهای ارسال شده
			</h1>
			<FilterSection />
			<Bids />
		</div>
	);
}
