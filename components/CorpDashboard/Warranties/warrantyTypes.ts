export interface TermItem {
    title: string;
    description: string;
    limitations: string;
}

export interface Warranty {
    id: number;
    name: string;
    description: string;
    guaranteeType: string | number;
    durationMonths: string | number;
    terms: TermItem[];
    status: string;
    isArchived: boolean;
    type: string | number;
    duration: number | string;
    onWarrantyUpdate?: () => void;
} 

export interface WarrantyType {
    id: string;
    name: string;
  }
  
  export interface FormValues {
    name: string;
    type: number;
    duration: number;
    description: string;
    terms: TermItem[];
  } 