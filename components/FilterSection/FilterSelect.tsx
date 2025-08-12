import React from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "../ui/skeleton";

interface Item {
    id: number;
    name: string;
    status?: string;
}

export default function FilterSelect({
    placeholder,
    width = 40,
    field,
    setField,
    possibleValues,
    loading,
    onValueChange,
    className
}: {
    placeholder?: string;
    width?: number;
    field?: string;
    setField?: React.Dispatch<React.SetStateAction<string>>;
    possibleValues?: Item[];
    loading?: boolean;
    onValueChange?: any;
    className?: string;
}) {
    return loading === true ? (
        <Skeleton className={`flex h-[40px] min-w-${width} w-full ${className}`} />
    ) : (
        <Select
            value={String(field)}
            onValueChange={(value) => {
                if (setField) {
                    setField(value);
                }
                if (onValueChange) {
                    onValueChange();
                }
            }}
        >
            <SelectTrigger
                dir="rtl"
                className={`flex w-full min-w-${width} cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] ${className}`}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent dir="rtl">
                {possibleValues?.map((status: Item, index: number) => (
                    <SelectItem
                        key={index}
                        value={String(status.id)}
                        className="cursor-pointer"
                    >
                        {status.name ? status.name : status.status}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
