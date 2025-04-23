import { vazir } from "@/lib/fonts";
import Neworder from "@/components/New-Order/new-order";
import OrderHistoryPagination from "@/components/OrderHistory/OrderHistoryPagination";
import Header from "@/components/Header/Header";

export default function Page() {
	return (
		<>
			<div
				className={`${"flex flex-col justify-center items-center mt-9"} ${
					vazir.className
				}`}
			>
				<div>
					<Neworder />

					<div className="text-center mt-3 text-navy-blue">
						<p>ثبت سفارش جدید</p>
					</div>
				</div>
			</div>
			<div className=" flex flex-row font-bold text-navy-blue text-2xl px-14 mt-5 justify-start ">	
				<Header header="سابقه سفارشات "/>
			</div>
			<OrderHistoryPagination />
		</>
	);
}
