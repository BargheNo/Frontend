import React from "react";
import styles from "./Users.module.css";
import { CalendarCheck2, Fingerprint, Settings, User } from "lucide-react";
const CustomIcon = ({ icon: Icon }: { icon: React.ElementType }) => {
	return (
		<div className={`${styles.icon} bg-[#F4F1F3] text-[#FA682D]`}>
			<Icon className="m-1" />
		</div>
	);
};

const User = ({
	name,
	id,
	date,
}: {
	name: string;
	id: string;
	date: string;
}) => {
	return (
		<div className="flex flex-row justify-between w-full h-full bg-[#F4F1F3] p-5 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 items-center">
			<div className="flex items-center gap-3">
				<CustomIcon icon={User} />
				<p>{name}</p>
			</div>
			<div className="flex items-center gap-3">
				<CustomIcon icon={Fingerprint} />
				{/* <p>781836189</p> */}
				<p>{id}</p>
			</div>
			<div className="flex items-center gap-3">
				<CustomIcon icon={CalendarCheck2} />
				{/* <p>تاریخ عضویت: 1404/2/7</p> */}
				<p>تاریخ عضویت: {date}</p>
			</div>
			<button
				className={`${styles.button} text-[#FA682D] flex gap-2 items-center p-2 hover:cursor-pointer`}
			>
				<p className="font-bold">جزئیات بیشتر و مدیریت</p>
				<Settings />
			</button>
		</div>
	);
};

export default function Users() {
	return (
		<div className="flex flex-col w-full text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
			<User name="یاسر تیموری" id="781836189" date="1404/2/7" />
		</div>
	);
}
