export interface CorpRepairItem {
    CreatedAt: string;
    Description: string;
    ID: number;
    OwnerPhone: string;
    Panel: {
        address: {
            ID: number;
            city: string;
            houseNumber: string;
            postalCode: string;
            province: string;
            streetAddress: string;
            unit: number;
        }
        area: number;
        azimuth: number;
        buildingType: string;
        customerName: string;
        customerPhone: string;
        id: number;
        operatorName: string;
        panelName: string;
        power: number;
        tilt: number;
        totalNumberOfModules: number;
    };
    PanelID: number;
    Subject: string;
    UrgencyLevel: "low" | "medium" | "high";
    Status: "pending" | "completed";
}

export interface MaintenanceRecord {
    Date: string;
    Title: string;
    Details: string;
}

export interface CorpRepairDialogProps {
    isOpen: boolean;
    onClose: () => void;
    repairItem: CorpRepairItem | null;
}

export interface RepairFormValues {
    date: string;
    time: string;
    title: string;
    note: string;
} 