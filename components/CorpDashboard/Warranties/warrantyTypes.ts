export interface TermItem {
    title: string;
    description: string;
    limitations: string;
}

export interface Warranty {
    name: string;
    description: string;
    type: string | number;
    duration: string | number;
    terms: TermItem[];
    isArchived: boolean;
} 

export interface WarrantyType {
    id: string;
    name: string;
  }
  
  export interface FormValues {
    name: string;
    type: string;
    duration: number;
    description: string;
    terms: TermItem[];
  } 