"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";
import styles from "./Tickets.module.css";
const truncate = (text: string, maxLength: number) => {
	return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Ticket = ({
	title,
	from,
	description,
	status,
	date,
}: {
	title: string;
	from: string;
	description: string;
	status: string;
	date: string;
}) => {
	return (
		<div className="flex flex-row justify-between w-full h-full bg-white gap-10 py-5 px-10 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0">
			{/* Right section */}
			<div className="w-5/6 flex flex-col gap-3">
				<p className="text-start content-start w-full text-2xl font-bold">
					{title}
				</p>
				<div className="flex gap-1">
					<span>از طرف:</span>
					<span className="font-bold">{from}</span>
				</div>
				<p>{truncate(description, 150)}</p>
			</div>
			{/* Left section */}
			<div className="w-1/6 pr-5 flex flex-col gap-4">
				{/* status */}
				<div className={`flex flex-col items-center ${styles.status} py-4 gap-2`}>
					<span className="text-[#636363] font-bold">{date}</span>
					<div className="flex items-center gap-2">
                        <span className="font-bold">{status}</span>
						<div
							className={`h-4 w-4 rounded-full ${
								status === "پاسخ دادید" ? "green" : "red"
							}-status shadow-md`}
						/>
					</div>
				</div>
				{/* answer */}
				<div
					className={`cta-neu-button flex ${styles.button} items-center content-center justify-center`}
				>
					<span>پاسخ</span>
					<ArrowLeft />
				</div>
			</div>
		</div>
	);
};

export default function Tickets() {
	return (
		<div className="list">
			<Ticket
				title="یک پیام خیلی خیلی خیلی مهم"
				from="رضا نصیری اقدم"
				description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و انها رفتند و مارا ترک کردند"
				status="پاسخ دادید"
				date="1404/2/23"
			/>
			<Ticket
				title="یک پیام خیلی خیلی مهم دیگر"
				from="رضا رضایی"
				description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و انها رفتند و مارا ترک کردند"
				status="بررسی نشده"
				date="1404/2/23"
			/>
			<Ticket
				title="یک پیام خیلی کمتر مهم"
				from="رضا آقاجانی"
				description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و انها رفتند و مارا ترک کردند"
				status="پاسخ دادید"
				date="1404/2/23"
			/>
		</div>
	);
}
