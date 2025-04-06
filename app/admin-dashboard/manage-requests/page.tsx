"use client";
import Panels from "@/components/admin-dashboard/Panels/Panels";
import FilterSection from "@/components/CorpDashboard/FilterSection";
import Header from "@/components/Header/Header";
import React from "react";

export default function page() {
	return (
		<div className="flex flex-col items-center gap-8 p-12 w-full bg-[#F0EDEF] min-h-[100vh]">
			<Header header="کلیه سفارشات" />
			<FilterSection />
			<Panels />
		</div>
	);
}
