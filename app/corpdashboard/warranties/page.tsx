"use client";
import AddWarranty from "@/components/CorpDashboard/Warranties/AddWarranty";
import Warranties from "@/components/CorpDashboard/Warranties/Warranties";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import React from "react";

export default function Page() {

	return (
		<PageContainer className="!gap-0">
			<Header className="!mb-0" header="گارانتی‌ها" />
			<AddWarranty />
			<Warranties />
		</PageContainer>
	);
}
