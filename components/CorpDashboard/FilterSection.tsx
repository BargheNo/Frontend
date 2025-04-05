import React, { useState } from "react";

import { Search } from "lucide-react";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
export default function FilterSection() {
	const [sorting, setSorting] = useState("most-recent");
	const [resultPerPage, setResultPerPage] = useState(20);
	return (
		<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden bg-[#F4F1F3] shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
			<div className="p-5 items-center flex">
				<div className="w-4/5">
					{/* <CustomInput placeholder="نام" name="firstname" icon={Search}  type="text" > </CustomInput> */}
				</div>
				<div className="flex justify-between w-1/5">
					<Select
						defaultValue="most-recent"
						value={sorting}
						onValueChange={(value) => {
							setSorting(value);
						}}
					>
						<SelectTrigger dir="rtl" className="bg-white">
							<SelectValue placeholder="جدیدترین" />
						</SelectTrigger>
						<SelectContent dir="rtl">
							<SelectItem
								value="most-recent"
								className="hover:cursor-pointer"
							>
								جدیدترین
							</SelectItem>
							<SelectItem
								value="top-visited"
								className="hover:cursor-pointer"
							>
								پربازدیدترین
							</SelectItem>
							<SelectItem
								value="top-liked"
								className="hover:cursor-pointer"
							>
								محبوب‌ترین
							</SelectItem>
						</SelectContent>
					</Select>

					<Select
						defaultValue={"20"}
						value={String(resultPerPage)}
						onValueChange={(value) => {
							setResultPerPage(Number(value));
						}}
					>
						<SelectTrigger dir="rtl" className="bg-white">
							<SelectValue placeholder="20" />
						</SelectTrigger>
						<SelectContent dir="rtl">
							<SelectItem
								value="10"
								className="hover:cursor-pointer"
							>
								10
							</SelectItem>
							<SelectItem
								value="20"
								className="hover:cursor-pointer"
							>
								20
							</SelectItem>
							<SelectItem
								value="50"
								className="hover:cursor-pointer"
							>
								50
							</SelectItem>
							<SelectItem
								value="100"
								className="hover:cursor-pointer"
							>
								100
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
