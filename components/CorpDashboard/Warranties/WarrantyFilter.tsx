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
        <div className="flex items-center gap-4">
            <Select
                value={String(currentStatus)}
                onValueChange={(value) => onStatusChange(Number(value))}
            >
                <SelectTrigger
                    dir="rtl"
                    className="w-40 cursor-pointer bg-white"
                >
                    <SelectValue placeholder="وضعیت گارانتی" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                    <SelectItem value="1" className="cursor-pointer">
                        گارانتی‌های فعال
                    </SelectItem>
                    <SelectItem value="2" className="cursor-pointer">
                        گارانتی‌های آرشیو شده
                    </SelectItem>
                    <SelectItem value="3" className="cursor-pointer">
                        همه گارانتی‌ها
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default WarrantyFilter; 