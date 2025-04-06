import React, { useState } from "react";
const initialValues = {
	search: "",
	resultPerPage: "10",
	sorting: "most-recent",
};
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Formik } from "formik";
import * as Yup from "yup";
import { Search } from "lucide-react";
import CustomInput from "../Custom/CustomInput/CustomInput";

const validationSchema = Yup.object({
	search: Yup.string(),
	sorting: Yup.string()
		.required()
		.oneOf(["most-recent", "by-status"], "مقدار ترتیب بندی صحیح نیست"),
	resultPerPage: Yup.string()
		.required()
		.oneOf(["10", "20", "50", "100"], "مقدار تعداد نتایج در هر صفحه درست نیست"),
});
export default function FilterSection() {
	const [sorting, setSorting] = useState("most-recent");
	const [resultPerPage, setResultPerPage] = useState("10");
	const handleFormSubmit = async ({
		search,
		sorting,
		resultPerPage,
	}: {
		search: string;
		sorting: string;
		resultPerPage: string;
	}) => {
		setSorting(sorting);
		setResultPerPage(resultPerPage);
	};
	return (
		<div className="flex flex-col w-full text-gray-800 rounded-2xl overflow-hidden bg-[#F4F1F3] shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleFormSubmit}
			>
				<div className="p-5 items-center flex gap-6">
					<div className="w-4/5">
						<CustomInput placeholder="جستجو" name="search" icon={Search} type="text" containerClassName="-translate-y-[11px]" > </CustomInput>
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
									بر اساس وضعیت
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
			</Formik>
		</div>
	);
}
