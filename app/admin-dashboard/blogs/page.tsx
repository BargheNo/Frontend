"use client";

import BlogsList from "@/components/admin-dashboard/Blogs/BlogsList/BlogsList";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";
import React from "react";
import NewBlog from "@/components/admin-dashboard/Blogs/NewBlog/NewBlog";
export default function Page() {
	if (!useClientCheck()) {
		return <LoadingSpinner />;
	}
	return (
		<PageContainer>
			{/* <div className="page"> */}
			<div className={`flex justify-center items-center mt-15`}>
				<div>
					<NewBlog />
					<div className="mt-3 text-navy-blue font-bold text-center">
						<p>ثبت مطلب جدید</p>
					</div>
				</div>
			</div>
			<Header header="مطالب قبلی" />
			<BlogsList />
			{/* </div> */}
		</PageContainer>
	);
}
