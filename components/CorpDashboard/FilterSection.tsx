"use client";
import React, { useEffect, useState } from "react";
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
import Header from "../Header/Header";
import { getData } from "@/src/services/apiHub";

interface status {
	id: number;
	name: string;
}

const validationSchema = Yup.object({
	search: Yup.string(),
	sorting: Yup.string()
		.required()
		.oneOf(["most-recent", "by-status"], "مقدار ترتیب بندی صحیح نیست"),
	resultPerPage: Yup.string()
		.required()
		.oneOf(
			["5", "10", "20", "50", "100"],
			"مقدار تعداد نتایج در هر صفحه درست نیست"
		),
});

export default function FilterSection({
	statusesListApiRoute,
	columnsListApiRoute,
	onStatusChange,
	onColumnChange,
	onResultPerPageChange,
	setLoading,
}: {
	statusesListApiRoute?: string;
	columnsListApiRoute?: string;
	onStatusChange?: (status: string) => void;
	onColumnChange?: (status: string) => void;
	onResultPerPageChange?: (status: string) => void;
	setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [statuses, setStatuses] = useState<status[] | null>(null);
	const [status, setStatus] = useState<string>("1");

	const [columns, setColumns] = useState<status[] | null>(null);
	const [column, setColumn] = useState<string>("1");
	const resultPerPages = ["5", "10", "20", "50", "100"];
	const [resultPerPage, setResultPerPage] = useState<string>("10");

	useEffect(() => {
		onStatusChange?.(status);
	}, [status, onStatusChange]);

	useEffect(() => {
		onColumnChange?.(column);
	}, [column, onColumnChange]);

	// fetch all statuses and columns for sorting
	useEffect(() => {
		if (statusesListApiRoute) {
			getData({ endPoint: statusesListApiRoute })
				.then((res) => {
					setStatuses(res?.data);
					if (columnsListApiRoute) {
						getData({ endPoint: columnsListApiRoute })
							.then((res2) => {
								setColumns(res2?.data);
							})
							.catch((err2) => console.log(err2))
							.finally(() => setLoading && setLoading(false));
					}
				})
				.catch((err) => console.log(err))
				.finally(
					() =>
						!columnsListApiRoute && setLoading && setLoading(false)
				);
		} else if (setLoading) {
			setLoading(false);
		}
	}, [statusesListApiRoute, columnsListApiRoute, setLoading]);
	return (
		<div className="flex place-items-center">
			<Header header="پنل‌های من" />
			{statuses && (
				<Select
					value={String(status)}
					onValueChange={(value) => setStatus(value)}
				>
					<SelectTrigger
						dir="rtl"
						className="flex min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
					>
						<SelectValue placeholder="وضعیت پنل" />
					</SelectTrigger>
					<SelectContent dir="rtl">
						{statuses?.map((status: status, index: number) => (
							<SelectItem
								key={index}
								value={String(status.id)}
								className="cursor-pointer"
							>
								{status.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
			{columns && (
				<Select
					value={String(column)}
					onValueChange={(value) => setColumn(value)}
				>
					<SelectTrigger
						dir="rtl"
						className="flex min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
					>
						<SelectValue placeholder="مرتب کردن بر اساس" />
					</SelectTrigger>
					<SelectContent dir="rtl">
						{columns?.map((column: status, index: number) => (
							<SelectItem
								key={index}
								value={String(column.id)}
								className="cursor-pointer"
							>
								{column.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
			{resultPerPages && (
				<Select
					value={resultPerPage}
					onValueChange={(value) => setResultPerPage(value)}
				>
					<SelectTrigger
						dir="rtl"
						className="flex min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
					>
						<SelectValue placeholder="تعداد نتایج در صفحه" />
					</SelectTrigger>
					<SelectContent dir="rtl">
						{resultPerPages?.map((resultPerPage: string, index: number) => (
							<SelectItem
								key={index}
								value={resultPerPage}
								className="cursor-pointer"
							>
								{resultPerPage}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</div>
	);
}
