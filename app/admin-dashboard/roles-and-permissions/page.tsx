import React from "react";
import RolesAndPermissions from "@/components/admin-dashboard/RolesAndPermissions/RolesAndPermissions";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";

const page = () => {
	return (
		<PageContainer>
			<Header header="نقش‌ها و دسترسی‌ها" />
			<RolesAndPermissions />
		</PageContainer>
	);
};

export default page;
