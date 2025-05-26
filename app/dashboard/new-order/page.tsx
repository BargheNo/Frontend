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
				{/* <div className={`${vazir.className}`}> */}
				<div className="flex flex-col justify-center items-center mt-9">
					<div>
						<Neworder />

						{/* <div className="text-center lg:font-semibold mt-3 text-navy-blue">
							<p>ثبت سفارش جدید</p>
						</div> */}
					</div>
				</div>
				<Header header="سابقه سفارشات" />
				{/* <div className="flex lg:flex-row flex-row-reverse lg:font-bold text-navy-blue lg:text-3xl font-bold lg:px-14 px-4 lg:mt-8 mt-10 justify-start py-1.5">
          <h1>سابقه سفارشات </h1>
          </div> */}

				<OrderHistoryPagination />
				{/* </div> */}
			</PageContainer>
		</>
	);
}
