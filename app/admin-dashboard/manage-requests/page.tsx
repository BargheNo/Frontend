"use client";
import Panels from "@/components/admin-dashboard/Panels/Panels";
import FilterSection from "@/components/CorpDashboard/FilterSection";
import Header from "@/components/Header/Header";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";
import React from "react";

export default function Page() {
	if (!useClientCheck()) {
		return <LoadingSpinner />;
	}
	return (
		<div className="flex flex-col items-center gap-8 p-12 w-full bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] min-h-[100vh]">
			<Header header="کلیه سفارشات" />
			<FilterSection />
			<Panels />
		</div>
	);
}
