interface TechnicalDetails {
	efficiency: number;
	capacity: number;
	todayProduction: number;
}

export interface PanelCardProps {
	panelName: string;
	technicalDetails: TechnicalDetails;
	address: string;
	className?: string;
}