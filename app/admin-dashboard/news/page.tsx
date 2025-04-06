
import NewNews from "@/components/admin-dashboard/News/NewNews/NewNews";
import NewsList from "@/components/admin-dashboard/News/NewsList/NewsList";
import Header from "@/components/Header/Header";
import React from "react";

export default function page() {
	return (
		<div className="page">
			<div
				className={`flex justify-center items-center mt-15`}
			>
				<div className="w-full">
					<NewNews />

					<div className="mt-3 text-navy-blue font-bold text-center">
						<p>ثبت خبر جدید</p>
					</div>
				</div>
			</div>
			<Header header="اخبار قبلی" />
			<NewsList />
		</div>
	);
}
