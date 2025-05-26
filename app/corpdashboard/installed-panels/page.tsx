import AddPanel from "@/components/Add-Panel/add-panel";
import AddComponent from "@/components/AddComponent/AddComponent";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import InstalledPanelPagination from "@/components/InstalledPanels/InstalldPanelPagination";
import { vazir } from "@/lib/fonts";
import Head from "next/head";
import React from "react";

export default function page() {
	// const address={ID: 1,province: "مازندران",city: "آمل",streetAddress: "خیابان هراز کوچه ی بی نام",postalCode: "1234564321",houseNumber: "12",unit: 1}
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<PageContainer>
				<AddPanel />

				<Header header="پنل‌های نصب‌ شده" />
				<InstalledPanelPagination />
			</PageContainer>
		</>
	);
}
