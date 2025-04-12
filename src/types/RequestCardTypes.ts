interface PanelDetailsProps {
	panelName: string;
    customerName: string;
	address: string;
    capacity: number;
    price: number;
}

export interface RequestCardProps {
	panelDetails: PanelDetailsProps;
	className?: string;
    requestId: number;
    // sentRequestsCount?: number;
}
export interface BidFormProps {
	panelDetails: PanelDetailsProps;
    requestId: number;
}
