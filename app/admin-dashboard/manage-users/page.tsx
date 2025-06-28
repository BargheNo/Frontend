"use client";
import Users from "@/components/admin-dashboard/Users/Users";
import React from "react";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
export default function Page() {
	return (
		<PageContainer>
			<Header header="مدیریت کاربران" />
			<Users />
		</PageContainer>
	);
}
