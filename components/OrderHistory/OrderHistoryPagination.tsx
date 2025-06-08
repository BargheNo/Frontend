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
import { useSelector } from "react-redux";
import panelNotFound from "../../public/images/panelNotFound/panelNotFound.png";
import LoadingSpinner from "../Loading/LoadingSpinner/LoadingSpinner";

// import { RootState } from "@/src/store/types";

export default function OrderHistoryPagination() {
	const [history, sethistory] = useState<Orderhistory[]>([]);
	const [currpage, Setcurrpage] = useState<string>("1");
	const [isLoading, setIsLoading] = useState(true);
	const handelHistory = (status: string, offset: string, limit: string) => {
		orderService
			.orderHistory({status: status ?? "1", offset: status ?? "1", limit: limit ?? "1"})
			.then((res) => {
				sethistory(res.data);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		handelHistory("1", currpage, "3");
	}, [currpage]);
	// const address = {
	//   ID: 2,
	//   province: "mazandaran",
	//   city: "amol",
	//   streetAddress: "khiaban haraz",
	//   postalCode: "9473647546",
	//   houseNumber: "1",
	//   unit: 1,
	// };
	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : history?.length > 0 ? (
				<>
					<div className="flex flex-col text-white bg-transparent">
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
				<div className="text-center place-items-center mt-6">
					<Image
						className="w-1/3"
						src={panelNotFound}
						alt="orderNotFound"
					/>
					<div className="-mt-8">
						<p
							className=" mt-6 text-navy-blue font-bold rtl"
							style={{ fontSize: "1.1rem" }}
						>
							هیچ سفارشی یافت نشد.
						</p>
					</div>
				</div>
			)}
			{history?.length > 0 && (
				<div className="p-5 rtl">
					<Pagination className="lg:mb-0 mb-20">
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
