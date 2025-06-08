"use client";
import AddWarranty from "@/components/CorpDashboard/Warranties/AddWarranty";
import Warranties from "@/components/CorpDashboard/Warranties/Warranties";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import React from "react";

export default function Page() {

	return (
		<PageContainer>
			<Header header="گارانتی‌ها" />
			<AddWarranty />
			<Warranties />
		</PageContainer>
	);
}
