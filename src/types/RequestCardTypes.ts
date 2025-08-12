interface PanelDetailsProps {
	panelName: string;
	address: string;
    capacity: number;
    price: number;
    buildingType: string;
    createdTime: string;
    status: string;
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
    setOpen: any;
}
