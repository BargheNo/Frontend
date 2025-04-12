"use client";

import BlogsList from "@/components/admin-dashboard/Blogs/BlogsList/BlogsList";
import NewBlog from "@/components/admin-dashboard/Blogs/NewBlog/NewBlog";
import Header from "@/components/Header/Header";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";
import React from "react";

export default function Page() {
	if (!useClientCheck()) {
		return <LoadingSpinner />;
	}
	return (
		<div className="page">
			<div className={`flex justify-center items-center mt-15`}>
				<div className="w-full">
					<NewBlog />

					<div className="mt-3 text-navy-blue font-bold text-center">
						<p>ثبت مطلب جدید</p>
					</div>
				</div>
			</div>
			<Header header="مطالب قبلی" />
			<BlogsList />
		</div>
	);
}
