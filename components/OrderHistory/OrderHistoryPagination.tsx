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
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

// import { RootState } from "@/src/store/types";

export default function OrderHistoryPagination() {
	const [history, sethistory] = useState<Orderhistory[]>([]);
	const [currpage, Setcurrpage] = useState<string>("1");
	const[isLoading,setIsLoading]=useState(true);
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const handelHistory = (page: string, pageSize: string) => {
		orderService
			.orderHistory({ page: page, pageSize: pageSize }, accessToken)
			.then((res) => {
				sethistory(res.data);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		handelHistory(currpage, "3");
	}, [currpage]);

	return (
		<>
			{isLoading ? <LoadingSpinner /> : history?.length > 0 ? (
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
				<div className="text-center place-items-center mt-6">
					
					<Image className="w-1/3" src={panelNotFound} alt="orderNotFound"/>
					<div className="-mt-8">
						<p className=" mt-6 text-navy-blue font-bold rtl" style={{fontSize:"1.1rem"}}>هیچ سفارشی یافت نشد.</p>
					</div>
				</div>
			)}
			{history?.length>0&&
			<div className="p-5">
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
			</div>
}  
		</>
	);
}
