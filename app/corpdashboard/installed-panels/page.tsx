import AddPanel from "@/components/Add-Panel/add-panel";
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
				{/* <div className={`${vazir.className} `}> */}
				<div className="flex flex-col justify-center items-center mt-9">
					<div>
						<AddPanel />
						<div className="text-center lg:font-semibold mt-3 text-navy-blue">
							<p>ثبت پنل جدید</p>
						</div>
					</div>
				</div>
				{/* <div className="flex lg:flex-row flex-row-reverse lg:font-bold text-navy-blue lg:text-3xl text-2xl font-bold lg:px-14 px-4 lg:mt-8 mt-10 justify-start py-1.5">
					<h1>پنل های نصب شده</h1>
				</div> */}
				<Header header="پنل‌های نصب‌شده" />
				<InstalledPanelPagination />
				{/* </div> */}
			</PageContainer>
		</>
	);
}
