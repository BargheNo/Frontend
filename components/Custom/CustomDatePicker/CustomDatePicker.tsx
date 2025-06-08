"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import styles from "./CustomDatePicker.module.css";
import DateConverter from "@/src/functions/toJalali";
export function CustomDatePicker({
	placeholder,
	className,
	date,
	setDate,
}: {
	placeholder: string;
	className?: string;
	date: string;
	setDate?: any;
}) {
	const [open, setOpen] = React.useState<boolean>(false);
	const applyTimeZone = (date?: Date) => {
		const rawDate = date?.getTime();
		const offsetMs = (3 * 60 + 30) * 60 * 1000;
		const timeZonedDate = rawDate
			? new Date(rawDate + offsetMs)
			: undefined;
		const timeZonedDateISO = timeZonedDate?.toISOString();
		console.log("date", date, timeZonedDateISO);
		return timeZonedDateISO;
	};

	return (
		<div className="flex flex-col gap-3">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<div
						className={`cursor-pointer w-full ${styles.Wrapper} ${styles.Conter}`}
					>
						<Button
							className={`justify-between text-[#8A8A8A] p-[10px] ${
								date ? "ltr px-10 text-black" : ""
							} cursor-pointer ${className} ${
								styles.CustomInput
							}`}
							type="button"
						>
							{date ? DateConverter(date) : placeholder}
						</Button>
						<CalendarDays className={`${styles.icon}`} />
					</div>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto overflow-hidden p-0"
					align="start"
				>
					<Calendar
						mode="single"
						selected={date ? new Date(date) : undefined}
						onSelect={(newDate) => {
							const timeZonedNewDate =
								newDate === undefined
									? ""
									: String(applyTimeZone(newDate));
							console.log(date, timeZonedNewDate);
							setDate(timeZonedNewDate);
							if (timeZonedNewDate) {
								setOpen(false);
							}
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
