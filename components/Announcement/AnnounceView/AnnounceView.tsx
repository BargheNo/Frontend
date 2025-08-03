"use client";
import AnnouncementBox from "../AnnouncementBox/AnnouncementBox";
import AnnounceCard from "../AnnounceCard/AnnounceCard";
import { getData } from "@/src/services/apiHub";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { toast } from "sonner";

import Image from "next/image";
import panelNotFound from "@/public/images/panelNotFound/panelNotFound.png";
import AnnounceAddCard from "../AnnounceAddCard/AnnounceAddCard";
import Header from "@/components/Header/Header";
import useHasPermission from "@/src/functions/hasPermission";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";

interface status {
	id: number;
	name: string;
}

interface News {
	id: string;
	title: string;
	content: string;
	status: number;
}

export default function AnnounceView({
	onlyView = false,
}: {
	onlyView?: boolean;
}) {
	const [statuses, setStatuses] = useState<status[] | null>(null);
	const [status, setStatus] = useState<string>("1");
	const hasCreateNewsPermission = useHasPermission("news.create");
	//   const [news, setNews] = useState<News[]>([]);
	const { isLoading, data, error } = useQuery({
		queryKey: ["news"],
		queryFn: async () => {
			if (onlyView) {
				return await getData({
					endPoint: `/v1/admin/news?status=${status}`,
				});
			} else {
				const r1 = await getData({
					endPoint: "/v1/admin/news?status=2",
				});
				// console.log("r1: ", r1);
				const r2 = await getData({
					endPoint: "/v1/admin/news?status=1",
				});
				// console.log("r2: ", r2);
				r1.data?.push(...r2.data);
				return r1;
			}
		},
	});

	return (
		<>
			{/* <div className="flex flex-row w-full items-center"> */}
			{hasCreateNewsPermission && !onlyView && <AnnounceAddCard />}

			<div className="flex place-items-center">
				<Header header="اخبار و اطلاعیه‌ها" />
				{statuses && (
					<Select
						value={String(status)}
						onValueChange={(value) => setStatus(value)}
						data-test="warranty-filter"
					>
						<SelectTrigger
							dir="rtl"
							className="flex min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
							data-test="warranty-filter-trigger"
						>
							<SelectValue placeholder="وضعیت پنل" />
						</SelectTrigger>
						<SelectContent dir="rtl">
							{statuses?.map((status: status, index: number) => (
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
				)}
			</div>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<AnnouncementBox
					className="bg-warm-white h-[60vh] w-full"
					insideClassName="gap-5"
				>
					{data?.data == 0 && (
						<div className="text-center flex flex-col items-center justify-center gap-4">
							<Image
								className="w-1/3"
								src={panelNotFound}
								alt="orderNotFound"
							/>
							<NoRecordFound text="هیچ خبری یافت نشد." />
							{/* <div className="-mt-8">
								<p
									className=" mt-6 text-navy-blue font-bold rtl"
									style={{ fontSize: "1.1rem" }}
								>
									هیچ خبری یافت نشد.
								</p>
							</div> */}
						</div>
					)}
					{data?.data?.map((item: News) => (
						<AnnounceCard
							onlyView={onlyView}
							key={item.id}
							id={item.id}
							title={item.title}
							status={item.status}
							//   content=
							//   writer="عرفان"
							//   date={new Date().getTime()}
						/>
					))}
				</AnnouncementBox>
			)}
		</>
	);
}
