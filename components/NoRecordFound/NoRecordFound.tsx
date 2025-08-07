import React from "react";
import Image from "next/image";
import panelNotFound from "@/public/images/panelNotFound/panelNotFound.png";

export default function NoRecordFound({
	text = "هیچ پنلی یافت نشد.",
}: {
	text?: string;
}) {
	return (
		<div className="relative text-center place-items-center py-18 bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] neu-container">
			<Image className="w-1/3" src={panelNotFound} alt="orderNotFound" />
			<div className="">
				<p
					className="mt-6 text-navy-blue font-bold rtl"
					style={{ fontSize: "1.1rem" }}
				>
					{text}
				</p>
			</div>
		</div>
	);
}
