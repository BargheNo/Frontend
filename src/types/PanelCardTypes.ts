interface TechnicalDetails {
	efficiency: number;
	capacity: number;
	todayProduction: number;
	status: string;
}

export interface PanelCardProps {
	id : string;
	panelName: string;
	technicalDetails: TechnicalDetails;
	address: string;
	className?: string;
}