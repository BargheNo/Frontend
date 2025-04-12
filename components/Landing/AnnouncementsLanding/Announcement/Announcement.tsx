import React from "react";
import styles from "./Announcement.module.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function Announcement({
	header,
	text,
}: {
	header: string;
	text: string;
}) {
	return (
		<div className={`${styles.Box} flex flex-row p-5 min-h-48`} dir="rtl">
			<div className="w-[90%]">
				<span className={`font-bold text-2xl py-2 px-5 w-full flex `}>
					{header}
				</span>
				<span className="text-right">{text}</span>
			</div>
			<Link href="meow" className="w-[10%]">
				<div className="flex flex-col justify-evenly h-full items-center text-[#FA682D]">
					<button className="border-solid border-4 w-16 h-16 flex items-center border-[#FA682D] rounded-full p-3 hover:cursor-pointer">
						<ArrowLeft className="mx-auto" />
					</button>
					<span>ادامه...</span>
				</div>
			</Link>
		</div>
	);
}
