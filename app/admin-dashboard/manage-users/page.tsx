"use client";
import Users from "@/components/admin-dashboard/Users/Users";
import FilterSection from "@/components/CorpDashboard/FilterSection";
import { Gem, ShieldUser, User, Wrench } from "lucide-react";
import React, { useState } from "react";
import styles from "./styles.module.css";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
export default function Page() {
	const [selected, setSelected] = useState("customers");
	if (!useClientCheck()) {
		return <LoadingSpinner />;
	}
	return (
		<PageContainer>
			<Header header="مدیریت کاربران" />

			{/* <div className="flex flex-col items-center gap-12 p-12 w-full bg-[#F0EDEF] min-h-[100vh]"> */}
      {/* <FilterSection /> */}
			<Users />
			{/* </div> */}
		</PageContainer>
	);
}
