import { vazir } from "@/lib/fonts";
import Neworder from "@/components/New-Order/new-order";
import OrderHistoryPagination from "@/components/OrderHistory/OrderHistoryPagination";

export default function Page() {
	return (
		<>
			<div
				className={`${"flex justify-center items-center mt-15"} ${
					vazir.className
				}`}
			>
				<div>
					<Neworder />

					<div className="mr-2 mt-3 text-navy-blue">
						<p>ثبت سفارش جدید</p>
					</div>
				</div>
			</div>
			<div className=" flex flex-row font-bold text-navy-blue text-2xl mr-8 mt-6 mb-3 justify-start ">
				<p> سابقه سفارشات </p>
			</div>
			<OrderHistoryPagination />
		</>
	);
}
