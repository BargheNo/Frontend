import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface WarrantyFilterProps {
    onStatusChange: (status: number) => void;
    currentStatus: number;
}

const WarrantyFilter: React.FC<WarrantyFilterProps> = ({ onStatusChange, currentStatus }) => {
    return (
        <div className="flex items-center gap-4" data-test="warranty-filter-container">
            <Select
                value={String(currentStatus)}
                onValueChange={(value) => onStatusChange(Number(value))}
                data-test="warranty-filter"
            >
                <SelectTrigger
                    dir="rtl"
                    className="w-40 cursor-pointer bg-white"
                    data-test="warranty-filter-trigger"
                >
                    <SelectValue placeholder="وضعیت گارانتی" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                    <SelectItem value="1" className="cursor-pointer" data-test="warranty-filter-option-active">
                        گارانتی‌های فعال
                    </SelectItem>
                    <SelectItem value="2" className="cursor-pointer" data-test="warranty-filter-option-archived">
                        گارانتی‌های آرشیو شده
                    </SelectItem>
                    <SelectItem value="3" className="cursor-pointer" data-test="warranty-filter-option-all">
                        همه گارانتی‌ها
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default WarrantyFilter; 