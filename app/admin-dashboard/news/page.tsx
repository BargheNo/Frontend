"use client";
import NewNews from "@/components/admin-dashboard/News/NewNews/NewNews";
import NewsList from "@/components/admin-dashboard/News/NewsList/NewsList";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";
import React from "react";

export default function Page() {
	if (!useClientCheck()) {
		return <LoadingSpinner />;
	}
	return (
		<PageContainer>
			{/* <div className="page"> */}
			<div className={`flex justify-center items-center mt-15`}>
				<div>
					<NewNews />

					<div className="mt-3 text-navy-blue font-bold text-center">
						<p>ثبت خبر جدید</p>
					</div>
				</div>
			</div>
			<Header header="اخبار قبلی" />
			<NewsList />
			{/* </div> */}
		</PageContainer>
	);
}
