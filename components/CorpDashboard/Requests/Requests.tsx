import React from "react";
import { useEffect, useState } from "react";
import RequestCard from "./RequestCard/RequestCard";
import { baseURL, getData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import DateConverter from "@/src/functions/toJalali";
import Header from "@/components/Header/Header";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";

interface address {
	province: string;
	city: string;
}

interface Request {
	id: number;
	name: string;
	buildingType: string;
	createdTime: string;
	status: string;
	address: address;
	powerRequest: number;
	maxCost: number;
}

// interface status {
// 	id: number;
// 	name: string;
// }

export default function Requests() {
	const [loading, setLoading] = useState<boolean>(true);
	const [requestData, setRequestData] = useState<Request[] | null>(null);

	// const [statuses, setStatuses] = useState<status[] | null>(null);
	// const [status, setStatus] = useState<string>("1");

	const corpId = useSelector((state: RootState) => state.user.corpId);
	useEffect(() => {
		setLoading(true);
		console.log("new req with status", status);
		getData({
			endPoint: `/v1/corp/${corpId}/installation/request`,
			params: { page: "1", pageSize: "12" },
		})
			.then((data) => {
				console.log(data);
				setRequestData(data?.data);
				getData({ endPoint: `/v1/installation/request/status` })
					.then((data) => {
						setStatuses(data?.data);
					})
					.catch((err) => console.log(err))
					.finally(() => setLoading(false));
			})
			.catch((err) => console.log(err));
	}, [status, corpId]);

	return (
		<>
			<div className="flex place-items-center">
				<Header header="درخواست‌های موجود در سرتاسر سامانه" />
				{/* {statuses && (
					<Select
						value={String(status)}
						onValueChange={(value) => setStatus(value)}
						data-test="warranty-filter"
					>
						<SelectTrigger
							dir="rtl"
							className="flex w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
							data-test="warranty-filter-trigger"
						>
							<SelectValue placeholder="وضعیت درخواست" />
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
				)} */}
			</div>
			<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden bg-[#F0EDEF] shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
				{loading ? (
					<LoadingSpinner />
				) : requestData && requestData?.length > 0 ? (
					requestData?.map((request) => (
						<RequestCard
							key={request.id}
							panelDetails={{
								panelName: request?.name,
								address: `استان ${request?.address?.province}، شهر ${request?.address?.city}`,
								capacity: request?.powerRequest,
								price: request?.maxCost,
								buildingType: request?.buildingType,
								status: request?.status,
								createdTime: DateConverter(
									request?.createdTime
								),
							}}
							requestId={request?.id}
						/>
					))
				) : (
					<NoRecordFound text="هیچ درخواستی یافت نشد." />
				)}
			</div>
		</>
	);
}
