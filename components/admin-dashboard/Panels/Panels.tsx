import IconWithBackground from "@/components/IconWithBackground/IconWithBackground";
import {
	ArrowLeft,
	CalendarFold,
	FileChartColumn,
	MapPin,
	User,
} from "lucide-react";
import styles from "./Panels.module.css";
import React from "react";
const Item = ({
	icon,
	fieldText,
	fieldValue,
}: {
	icon: React.ElementType;
	fieldText?: string;
	fieldValue: string;
}) => {
	return (
		<div className="flex items-center gap-2">
			<IconWithBackground
				icon={icon}
				color="#676767"
				backgroundColor="[#EFF0F1]"
			/>
			<div className="flex gap-1 items-center">
				{fieldText && <span className="font-bold">{fieldText}:</span>}
				<span>{fieldValue}</span>
			</div>
		</div>
	);
};

const Panel = ({
	name,
	status,
	date,
	location,
	customerName,
}: {
	name: string;
	status: string;
	date: string;
	location: string;
	customerName: string;
}) => {
	return (
		<div className="flex flex-row justify-between w-full h-full py-5 px-10 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 items-stretch">
			{/* Right section */}
			<div className="flex flex-col gap-3">
				<p className="text-start content-start w-full text-2xl font-bold">
					{name}
				</p>
				<Item
					icon={FileChartColumn}
					fieldText="وضعیت"
					fieldValue={status}
				/>
				<Item
					icon={CalendarFold}
					fieldText="تاریخ ثبت درخواست"
					fieldValue={date}
				/>
				<Item icon={MapPin} fieldValue={location} />
				<Item
					icon={User}
					fieldText="خریدار"
					fieldValue={customerName}
				/>
			</div>
			{/* Left section */}
			<button className={`items-center flex flex-col place-self-center gap-3 hover:cursor-pointer`}>
				<div className={`text-[#FA682D] p-6 bg-[#E9E7EB] rounded-full ${styles.button}`}>
					<ArrowLeft />
				</div>
				<p>مشاهده جزئیات</p>
			</button>
		</div>
	);
};
export default function Panels() {
	return (
		<div className="flex flex-col w-full bg-[#F0EDEF] text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
			<Panel
				name="پنل خانه تهرانپارس"
				status="3 پیشنهاد ثبت شده"
				date="1404/2/1"
				location="فلکه هفتم تهرانپارس"
				customerName="مرتضی رضوی"
			/>
			<Panel
				name="پنل خانه تهرانپارس"
				status="تایید شده توسط یک فروشنده"
				date="1404/2/1"
				location="فلکه هفتم تهرانپارس"
				customerName="مرتضی رضوی"
			/>
			<Panel
				name="رد شده"
				status="3 پیشنهاد ثبت شده"
				date="1404/2/1"
				location="فلکه هفتم تهرانپارس"
				customerName="مرتضی رضوی"
			/>
		</div>
	);
}
