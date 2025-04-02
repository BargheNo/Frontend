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

export default function OrderHistoryPagination() {
	const [history, sethistory] = useState<Orderhistory[]>([]);
	const [currpage, Setcurrpage] = useState<number>(1);
	const handelHistory = (page: number, pageSize: number) => {
		orderService
			.orderHistory(
				{ page: page, pageSize: pageSize },
				"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDU0MDY2ODMsImlhdCI6MTc0MjgxNDY4Mywic3ViIjo4fQ.caUJAw9Uxc4j6bCBm-eAkTPKbb03ucbOzuMmk4Wf5uQids7wiTCI4tm5wS_FYuPAL2CcIS0LLdvOE-Qhy91zhmTdPoizBn_dcXkGQFBmSLsXgqUHDb9NyG9gSsSHBj8X038hq52FzQevo-47R1ru6rNZOjxefDox7ovc71zcDwo"
			)
			.then((res) => {
				sethistory(res.data.data);
				console.log(res);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		handelHistory(currpage, 3);
	}, [currpage]);

	return (
		<>
			{/* <OrderHistory
				id={1}
				name={"mglkrm"}
				address={{
					ID: 1,
					province: "fars",
					city: "shiraz",
					streetAddress: "meow",
					postalCode: "123",
					houseNumber: "wedgrg",
					unit: 5,
				}}
				status={"mglkrm"}
				createdTime={"mglkrm"}
			/> */}
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
			<Pagination className="mt-3">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={() =>
								Setcurrpage((prev) => Math.max(prev - 1, 1))
							}
						/>
					</PaginationItem>
					{[1, 2, 3].map((page) => (
						<PaginationItem key={page}>
							<PaginationLink
								href="#"
								onClick={() => Setcurrpage(page)}
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
							onClick={() => Setcurrpage((prev) => prev + 1)}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	);
}
