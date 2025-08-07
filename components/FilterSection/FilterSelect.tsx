import React from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Item {
	id: number;
	name: string;
}

export default function FilterSelect({
	placeholder,
    width = 40,
	field,
	setField,
	possibleValues,
}: {
	placeholder?: string;
    width?: number;
	field?: string;
	setField?: React.Dispatch<React.SetStateAction<string>>;
	possibleValues?: Item[];
}) {
	return (
		<Select
			value={String(field)}
			onValueChange={(value) => setField && setField(value)}
		>
			<SelectTrigger
				dir="rtl"
				className={`flex min-w-${width} cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]`}
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
						{status.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
