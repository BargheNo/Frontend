"use client";

import Requests from "@/components/CorpDashboard/Requests/Requests";
import FilterSection from "@/components/CorpDashboard/FilterSection";
import React from "react";

export default function Page() {
	return (
		<div className="min-h-full flex flex-col text-white py-8 px-14 bg-[#E9E7EB] gap-5">
			<h1 className="text-[#003a8b] text-3xl mb-6 font-black">
				درخواست‌های موجود در سرتاسر سامانه
			</h1>
			<FilterSection />
			<Requests />
		</div>
	);
}
