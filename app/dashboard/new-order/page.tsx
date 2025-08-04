import Head from "next/head";
import Neworder from "@/components/New-Order/new-order";
import OrderHistoryPagination from "@/components/OrderHistory/OrderHistoryPagination";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

export default function Page() {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<PageContainer>
				<Neworder />
				<OrderHistoryPagination />
			</PageContainer>
		</>
	);
}
