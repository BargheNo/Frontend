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