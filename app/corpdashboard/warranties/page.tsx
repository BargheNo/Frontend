"use client";
import AddWarranty from "@/components/CorpDashboard/Warranties/AddWarranty";
import Warranties from "@/components/CorpDashboard/Warranties/Warranties";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import React, { useRef } from "react";

export default function Page() {
	const warrantiesRef = useRef<{ refreshWarranties: () => void }>(null);

	const handleWarrantyUpdate = () => {
		warrantiesRef.current?.refreshWarranties();
	};

	return (
		<PageContainer>
			<AddWarranty onWarrantyAdded={handleWarrantyUpdate} />
			<Warranties ref={warrantiesRef} />
		</PageContainer>
	);
}
