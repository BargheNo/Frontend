"use client";
import Image from "next/image";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import orderService from "@/src/services/orderService";
import { useEffect, useState } from "react";
import { Orderhistory } from "@/src/types/OrderhistoryType";
import OrderHistory from "@/components/OrderHistory/OrderHistory";
import panelNotFound from "../../public/images/panelNotFound/panelNotFound.png";
import LoadingSpinner from "../Loading/LoadingSpinner/LoadingSpinner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { getData } from "@/src/services/apiHub";
import NoRecordFound from "../NoRecordFound/NoRecordFound";
import Header from "../Header/Header";
import FilterSection from "../FilterSection/FilterSection";

export default function OrderHistoryPagination({
	currpage,
	setCurrpage,
	status,
	setStatus,
	isLoading,
	history,
	resultPerPage,
	setResultPerPage,
}: {
	currpage: string;
	setCurrpage: any;
	status: string;
	setStatus: any;
	isLoading: boolean;
	history: Orderhistory[];
	resultPerPage: string;
	setResultPerPage: React.Dispatch<React.SetStateAction<string>>;
}) {
	// useEffect(() => {
	// 	handelHistory();
	// 	// setIsLoading(true);
	// 	// getData({ endPoint: `/v1/installation/request/status` })
	// 	// 	.then((data) => {
	// 	// 		setStatuses(data?.data);
	// 	// 	})
	// 	// 	.catch((err) => {
	// 	// 		console.log(err);
	// 	// 	});
	// }, [handelHistory]);
	return (
		<>
			<FilterSection
				header="سابقه سفارشات"
				statusesListApiRoute={`/v1/installation/request/status`}
				fieldName="درخواست"
				status={status}
				setStatus={setStatus}
				resultPerPage={resultPerPage}
				setResultPerPage={setResultPerPage}
			/>
			{isLoading ? (
				<LoadingSpinner />
			) : history?.length > 0 ? (
				<>
					<div className="flex flex-col bg-transparent">
						<div className="flex flex-col text-gray-800 rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
							{history.map((order: Orderhistory, index) => (
								<OrderHistory
									key={index}
									id={index}
									name={order.name}
									address={order.address}
									status={order.status}
									createdTime={order.createdTime}
								/>
							))}
						</div>
					</div>
				</>
			) : (
				<NoRecordFound text="هیچ سفارشی یافت نشد." />
			)}
		</>
	);
}
