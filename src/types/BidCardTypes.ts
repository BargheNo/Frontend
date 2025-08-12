export interface BidInfo {
	id: number;
	price: number;
	date: string;
	power: number;
	status: string;
	area: number;
	description: string;
	panelName: string;
	buildingType: string;
	address: Address;
	updateBids: any;
}

export interface BidSchema {
	cost: string;
	area: string;
	power: string;
	installationTime: string;
	description: string;
	guaranteeID: string;
	paymentTerms: { method: string };
}

export interface TermsProps {
	title: string;
	description: string;
	limitations: string;
}

export interface GuaranteeProps {
	id: number;
	name: string;
	status: string;
	guaranteeType: string;
	durationMonths: number;
	description: string;
	terms: TermsProps[];
}
