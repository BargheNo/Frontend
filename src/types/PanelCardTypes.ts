interface TechnicalDetails {
	efficiency: number;
	capacity: number;
	todayProduction: number;
}

export interface PanelCardProps {
	id : string;
	panelName: string;
	technicalDetails: TechnicalDetails;
	address: string;
	className?: string;
	status: string;
}