import Head from "next/head";
import { vazir } from "@/lib/fonts";
import Neworder from "@/components/New-Order/new-order";
import OrderHistoryPagination from "@/components/OrderHistory/OrderHistoryPagination";
import Header from "@/components/Header/Header";
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
				{/* <div className="flex flex-col justify-center items-center mt-9">
					<div>
						<Neworder />
					</div>
				</div> */}
				<Header header="سابقه سفارشات" />
				<Neworder />
				<OrderHistoryPagination />
			</PageContainer>
		</>
	);
}
