interface PanelDetailsProps {
	panelName: string;
	customerName: string;
	address: string;
	capacity: number;
	price: number;
}

export interface BidCardProps {
	panelDetails: PanelDetailsProps;
	className?: string;
	status: string;
}
