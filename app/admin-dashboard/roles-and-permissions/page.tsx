import React from "react";
import RolesAndPermissions from "@/components/admin-dashboard/RolesAndPermissions/RolesAndPermissions";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

const page = () => {
	return (
		<PageContainer>
			<RolesAndPermissions />
		</PageContainer>
	);
};

export default page;
