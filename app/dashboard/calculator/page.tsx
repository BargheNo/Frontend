import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import React from "react";
import Calculator from "@/components/Calculator/Calculator";

export default function Page() {
	return (
		<PageContainer>
			<Header header="محاسبه‌گر" />
            <Calculator />
		</PageContainer>
	);
}
