import React from "react";
import CustomerTickets from "@/components/Dashboard/Tickets/CustomerTickets";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

const page = () => {
	return (
		<PageContainer>
				<CustomerTickets />
		</PageContainer>
	);
};

export default page;
