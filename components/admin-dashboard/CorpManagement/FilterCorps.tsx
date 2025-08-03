"use client";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectGroup,
	SelectLabel,
} from "@/components/ui/select";
import { getData } from "@/src/services/apiHub";
import { useEffect, useState } from "react";

interface StatusType {
	id: number;
	status: string;
}

interface FilterCorpsProps {
	value: string;
	onChange: (value: string) => void;
	setLoading: any;
}

const statusColors: Record<number, string> = {
	1: "bg-green-500", // تایید شده
	2: "bg-yellow-500", // در انتظار تایید
	3: "bg-orange-500", // معلق
	4: "bg-red-500", // رد شده
	5: "bg-gray-500", // همه
};

export const FilterCorps = ({
	value,
	onChange,
	setLoading,
}: FilterCorpsProps) => {
	const [statuses, setStatuses] = useState<StatusType[]>([]);
	const getStatuses = () => {
		// setLoading(true);
		getData({ endPoint: `/v1/admin/corporation/status` })
			.then((data) => {
				console.log("data", data);
				setStatuses(data?.data);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};
	useEffect(() => {
		getStatuses();
	}, []);

	return (
		<Select onValueChange={onChange} value={value}>
			<SelectTrigger
				dir="rtl"
				className="flex min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
			>
				<SelectValue placeholder="وضعیت" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>وضعیت</SelectLabel>
					{statuses.map((status) => (
						<SelectItem
							key={status.id}
							value={status.id.toString()}
							className="cursor-pointer rtl place-content-end"
						>
							<div className="flex items-center gap-2 rtl place-items-end">
								<div
									className={`h-3 w-3 rounded-full ${
										statusColors[status.id]
									}`}
								/>
								<span>{status.status}</span>
							</div>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
