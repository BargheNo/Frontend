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

					<div className="mr-2 mt-3 text-navy-blue font-bold">
						<p>ثبت مطلب جدید</p>
					</div>
				</div>
			</div>
			<Header header="مطالب قبلی" />
			<BlogsList />
		</div>
	);
}
