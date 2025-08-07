export interface CorpRepairItem {
    id: number;
    createdAt: string;
    panel: {
        id: number;
        name: string;
        status: string;
        buildingType: string;
        area: number;
        power: number;
        tilt: number;
        azimuth: number;
        totalNumberOfModules: number;
        guaranteeStatus: string;
        operator: {
            id: number;
            firstName: string;
            lastName: string;
            phone: string;
            email: string;
            nationalID: string;
            profilePic: string;
            status: string;
        };
        customer: {
            id: number;
            firstName: string;
            lastName: string;
            phone: string;
            email: string;
            nationalID: string;
            profilePic: string;
            status: string;
        };
        address: {
            id: number;
            province: string;
            provinceID: number;
            cityID: number;
            city: string;
            streetAddress: string;
            postalCode: string;
            houseNumber: string;
            unit: number;
        };
        guarantee: {
            id: number;
            name: string;
            status: string;
            guaranteeType: string;
            durationMonths: number;
            description: string;
            terms: null;
        };
    };
    subject: string;
    description: string;
    urgencyLevel: string;
    status: "در انتظار تایید" | "تایید شده" | "رد شده" | "تمام شده";
    isGuaranteeRequested: boolean;
    record: MaintenanceRecord[];
}

export interface MaintenanceRecord {
    id: number;
    createdAt: string;
    operator: {
        id: number;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        nationalID: string;
        profilePic: string;
        status: string;
    };
    title: string;
    details: string;
    isApproved: boolean;
    violation?: {
        operator: {
            id: number;
            firstName: string;
            lastName: string;
            phone: string;
            email: string;
            nationalID: string;
            profilePic: string;
            status: string;
        };
        reason: string;
        details: string;
    };
}

export interface CorpRepairDialogProps {
    isOpen: boolean;
    onClose: () => void;
    repairItem: CorpRepairItem | null;
}

export interface RepairFormValues {
    title: string;
    details: string;
    guaranteeViolation?: {
        reason: string;
        details: string;
    };
} 