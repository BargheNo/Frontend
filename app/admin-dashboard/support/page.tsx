import Tickets from "@/components/admin-dashboard/Tickets/Tickets";
import FilterSection from "@/components/CorpDashboard/FilterSection";
import Header from "@/components/Header/Header";
import React from "react";

export default function page() {
	return <div className="page">
		<Header header="تیکت‌ها" />
		<FilterSection />
		<Tickets />
	</div>;
}
