import { Calendar, FilePenLine } from "lucide-react";
import React from "react";

const NewsItem = ({
	title,
	author,
	date,
}: {
	title: string;
	author: string;
	date: string;
}) => {
	return (
		<div className="flex flex-row justify-between w-full h-full py-5 px-10 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0">
			<div className="flex flex-col gap-5">
				{/* Right section */}
				<p className="text-start content-start w-full text-2xl font-bold">
					{title}
				</p>
				<div className="flex flex-row items-center gap-2 text-[#FA682D]">
					<Calendar />
					<span className="text-[#636363] font-bold flex place-self-center">{date}</span>
				</div>
				<div className="flex gap-1">
					<span>نویسنده:</span>
					<span className="font-bold">{author}</span>
				</div>
			</div>
			{/* Left section */}
			<div className="flex items-center">
                <button className="font-bold bg-white text-[#FA682D] cta-neu-button flex gap-2">
                    <span>ویرایش</span>
                    <FilePenLine className="font-bold" />
                </button>
            </div>
		</div>
	);
};

export default function NewsList() {
	return (
		<div className="list">
			<NewsItem
				title="خبر خیلی مهم"
				author="مرتضی مرتضوی"
				date="1404/2/23"
			/>
			<NewsItem
				title="خبر خیلی مهم تر"
				author="مرتضی مرتضوی"
				date="1404/2/23"
			/>
			<NewsItem
				title="خبر کمتر مهم"
				author="مرتضی مرتضوی"
				date="1404/2/23"
			/>
		</div>
	);
}
