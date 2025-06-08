interface PanelDetailsProps {
	name: string;
	customerName: string;
	address: string;
	capacity: number;
	price: number;
}

interface RequestDetailsProps {
	id: number;
	name: string;
	createdTime: string;
	status: string;
	buildingType: string;
	powerRequest: number;
	maxCost: number;
	address: Address;
}

export interface BidCardProps {
	id: number;
	description: string;
	cost: number;
	request: RequestDetailsProps;
	status: string;
	installationTime: string;
	panelDetails: PanelDetailsProps;
	className?: string;
}
