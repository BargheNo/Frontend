"use client";

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
import { RootState } from "@/src/store/types";

export default function OrderHistoryPagination() {
	const [history, sethistory] = useState<Orderhistory[]>([]);
	const [currpage, Setcurrpage] = useState<string>("1");
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const handelHistory = (page: string, pageSize: string) => {
		orderService
			.orderHistory({ page: page, pageSize: pageSize }, accessToken)
			.then((res) => {
				// console.log(res.data);
				sethistory(res.data);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		handelHistory(currpage, "3");
	}, [currpage]);

	return (
		<>
			{history?.length > 0 ? (
				history.map((order: Orderhistory, index) => (
					<OrderHistory
						key={index}
						id={index}
						name={order.name}
						address={order.address}
						status={order.status}
						createdTime={order.createdTime}
					/>
				))
			) : (
				<p className="text-center mt-6">هیچ سفارشی یافت نشد</p>
			)}
			{history?.length>0&&
			<Pagination className="mt-3">
				<PaginationContent>
					<PaginationItem>
						{Number(currpage)>1&&
						<PaginationPrevious
							href="#"
							onClick={() =>
								Setcurrpage((prev) => String(Math.max(Number(prev) - 1, 1)))
							}
						/>}
					</PaginationItem>
					{["1", "2", "3"].map((page) => (
						<PaginationItem key={page}>
							<PaginationLink
								href="#"
								onClick={() => Setcurrpage(page)}
								isActive={page===currpage}
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
							onClick={() => Setcurrpage((prev) => String(Number(prev) + 1))}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
}
		</>
	);
}
