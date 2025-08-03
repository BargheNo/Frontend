"use client";

import React from "react";

import Bids from "@/components/CorpDashboard/Bids/Bids";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

export default function Page() {
	return (
		<PageContainer>
			<Bids />
		</PageContainer>
	);
}
