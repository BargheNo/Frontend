import React from "react";
import CustomerTickets from "@/components/Dashboard/Tickets/CustomerTickets";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

const page = () => {
	return (
		<PageContainer>
			{/* <div> */}
				<CustomerTickets />
			{/* </div> */}
		</PageContainer>
	);
};

export default page;
