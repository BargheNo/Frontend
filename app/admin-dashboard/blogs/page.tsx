import BlogsList from "@/components/admin-dashboard/Blogs/BlogsList/BlogsList";
import NewBlog from "@/components/admin-dashboard/Blogs/NewBlog/NewBlog";
import Header from "@/components/Header/Header";
import React from "react";

export default function page() {
	return (
		<div className="page">
			<div
				className={`flex justify-center items-center mt-15`}
			>
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
