import AddPanel from "@/components/Add-Panel/add-panel";
import InstalledPanelPagination from "@/components/InstalledPanels/InstalldPanelPagination";
import InstalledPanel from "@/components/InstalledPanels/InstalledPanels";
import { vazir } from "@/lib/fonts";
import React from "react";

export default function page() {
	// const address={ID: 1,province: "مازندران",city: "آمل",streetAddress: "خیابان هراز کوچه ی بی نام",postalCode: "1234564321",houseNumber: "12",unit: 1}
	return <>
				<div
					className={`${"flex justify-center items-center mt-9"} ${
						vazir.className
					}`}
				>
					<div>
						<AddPanel />
	
						<div className="text-center mt-3 text-navy-blue">
							<p>ثبت پنل جدید</p>
						</div>
					</div>
				</div>
				<div className=" flex flex-row font-bold text-navy-blue text-2xl mr-8 mt-6 mb-3 justify-start ">
					<p> پنل های نصب شده</p>
				</div>
				<InstalledPanelPagination></InstalledPanelPagination>
				{/* <InstalledPanel address={address} customerName="تینا محمدپور" panelName="super power" power={12000}></InstalledPanel> */}
			</>;
}
