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
} 

export interface WarrantyType {
    id: string;
    name: string;
  }
  
  export interface FormValues {
    warrantyName: string;
    warrantyType: string;
    warrantyDuration: number;
    warrantyDescription: string;
    terms: TermItem[];
  } 