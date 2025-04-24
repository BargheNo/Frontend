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

					<div className="text-center  lg:font-semibold mt-3 text-navy-blue">
						<p>ثبت سفارش جدید</p>
					</div>
				</div>
			</div>
			<div className=" flex flex-row lg:font-bold text-navy-blue lg:text-3xl font-bold lg:px-14 px-4  lg:mt-8 mt-10 justify-start py-1.5">	
				<h1>سابقه سفارشات </h1>
			</div>
			<OrderHistoryPagination />
		</>
	);
}
