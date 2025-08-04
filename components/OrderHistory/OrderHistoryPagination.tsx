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

interface status {
	id: number;
	name: string;
}

export default function OrderHistoryPagination({
	currpage,
	setCurrpage,
	status,
	setStatus,
	isLoading,
	setIsLoading,
	history,
	handelHistory,
}: {
	currpage: string;
	setCurrpage: any;
	status: string;
	setStatus: any;
	isLoading: boolean;
	setIsLoading: any;
	history: Orderhistory[];
	handelHistory: any;
}) {
	const [statuses, setStatuses] = useState<status[] | null>(null);

	useEffect(() => {
		setIsLoading(true);
		getData({ endPoint: `/v1/installation/request/status` })
			.then((data) => {
				setStatuses(data?.data);
				handelHistory(status, currpage, "10");
			})
			.catch((err) => {
				console.log(err);
			});
	}, [status, currpage]);
	return (
		<>
			<div className="flex place-items-center">
				<Header header="سابقه سفارشات" />
				{statuses && (
					<Select
						value={String(status)}
						onValueChange={(value) => setStatus(value)}
						data-test="warranty-filter"
					>
						<SelectTrigger
							dir="rtl"
							className="flex min-w-32 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
							data-test="warranty-filter-trigger"
						>
							<SelectValue placeholder="وضعیت درخواست" />
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
			</div>
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
				<NoRecordFound />
			)}
			{history?.length > 0 && (
				<div className="p-5 rtl">
					<Pagination className="lg:mb-0 mb-20 relative">
						<PaginationContent>
							<PaginationItem>
								{Number(currpage) > 1 && (
									<PaginationPrevious
										href="#"
										onClick={() =>
											setCurrpage((prev: string) =>
												String(
													Math.max(
														Number(prev) - 1,
														1
													)
												)
											)
										}
									/>
								)}
							</PaginationItem>
							{["1", "2", "3"].map((page) => (
								<PaginationItem key={page}>
									<PaginationLink
										href="#"
										onClick={() => setCurrpage(page)}
										isActive={page === currpage}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									href="#"
									onClick={() =>
										setCurrpage((prev: string) =>
											String(Number(prev) + 1)
										)
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</>
	);
}
