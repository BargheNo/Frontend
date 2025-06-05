"use client";
import Users from "@/components/admin-dashboard/Users/Users";
import FilterSection from "@/components/CorpDashboard/FilterSection";
import { Gem, ShieldUser, User, Wrench } from "lucide-react";
import React, { useState } from "react";
import styles from "./styles.module.css";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";
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
