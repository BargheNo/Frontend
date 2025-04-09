import AddPanel from "@/components/Add-Panel/add-panel";
import { vazir } from "@/lib/fonts";
import React from "react";

export default function page() {
	return <>
				<div
					className={`${"flex justify-center items-center mt-15"} ${
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
				{/* <OrderHistoryPagination /> */}
			</>;
}
