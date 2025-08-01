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

export default function OrderHistoryPagination() {
	const [history, sethistory] = useState<Orderhistory[]>([]);
	const [currpage, Setcurrpage] = useState<string>("1");
	const [isLoading, setIsLoading] = useState(true);
	const [statuses, setStatuses] = useState<status[] | null>(null);
	const [status, setStatus] = useState<string>("1");
	const handelHistory = (status: string, offset: string, limit: string) => {
		orderService
			.orderHistory({
				status: status ?? "1",
				offset: offset ?? "1",
				limit: limit ?? "10",
			})
			.then((res) => {
				sethistory(res?.data);
				// setIsLoading(false);
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	};
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
							<SelectValue placeholder="وضعیت گارانتی" />
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
				// <div className="relative text-center place-items-center py-18 bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]">
				// 	<Image
				// 		className="w-1/3"
				// 		src={panelNotFound}
				// 		alt="orderNotFound"
				// 	/>
				// 	<div className="">
				// 		<p
				// 			className="mt-6 text-navy-blue font-bold rtl"
				// 			style={{ fontSize: "1.1rem" }}
				// 		>
				// 			هیچ پنلی یافت نشد.
				// 		</p>
				// 	</div>
				// </div>
				// <div className="text-center place-items-center mt-6">
				// 	<Image
				// 		className="w-1/3"
				// 		src={panelNotFound}
				// 		alt="orderNotFound"
				// 	/>
				// 	<div className="-mt-8">
				// 		<p
				// 			className=" mt-6 text-navy-blue font-bold rtl"
				// 			style={{ fontSize: "1.1rem" }}
				// 		>
				// 			هیچ سفارشی یافت نشد.
				// 		</p>
				// 	</div>
				// </div>
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
											Setcurrpage((prev) =>
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
										onClick={() => Setcurrpage(page)}
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
										Setcurrpage((prev) =>
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
