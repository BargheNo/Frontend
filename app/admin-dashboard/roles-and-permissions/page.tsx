import React from "react";
import RolesAndPermissions from "@/components/admin-dashboard/RolesAndPermissions/RolesAndPermissions";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";

const page = () => {
	return (
		<PageContainer>
			{/* <div> */}
      <Header header="نقش‌ها و دسترسی‌ها" />
			<RolesAndPermissions />

			{/* </div> */}
		</PageContainer>
	);
};

export default page;
