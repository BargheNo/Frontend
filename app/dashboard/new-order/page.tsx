"use client";
import Head from "next/head";
import Neworder from "@/components/New-Order/new-order";
import OrderHistoryPagination from "@/components/OrderHistory/OrderHistoryPagination";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import { useCallback, useEffect, useState } from "react";
import orderService from "@/src/services/orderService";
import { Orderhistory } from "@/src/types/OrderhistoryType";

export default function Page() {
	const [currpage, setCurrpage] = useState<string>("1");
	const [status, setStatus] = useState<string>("1");
	const [resultPerPage, setResultPerPage] = useState<string>("10");
	const [isLoading, setIsLoading] = useState(true);
	const [history, sethistory] = useState<Orderhistory[]>([]);
	const handelHistory = useCallback(() => {
		setIsLoading(true);
		orderService
			.orderHistory({
				status: status,
				pageSize: resultPerPage,
			})
			.then((res) => {
				sethistory(res?.data);
				// setIsLoading(false);
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	}, [resultPerPage, status]);
	useEffect(() => {
		handelHistory();
	}, [handelHistory])
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<PageContainer>
				<Neworder
					currpage={currpage}
					status={status}
					handelHistory={handelHistory}
				/>
				<OrderHistoryPagination
					currpage={currpage}
					setCurrpage={setCurrpage}
					status={status}
					setStatus={setStatus}
					isLoading={isLoading}
					history={history}
					resultPerPage={resultPerPage}
					setResultPerPage={setResultPerPage}
				/>
			</PageContainer>
		</>
	);
}
