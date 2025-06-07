"use client";

import BlogsList from "@/components/admin-dashboard/Blogs/BlogsList/BlogsList";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";
import React from "react";
import NewBlog from "@/components/admin-dashboard/Blogs/NewBlog/NewBlog";
export default function Page() {
	if (!useClientCheck()) {
		return <LoadingSpinner />;
	}
	return (
		<PageContainer>
			<Header header="بلاگ‌ها" />
			<NewBlog />
			<Header header="مطالب قبلی" />
			<BlogsList />
		</PageContainer>
	);
}
