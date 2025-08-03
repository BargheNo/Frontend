import React, { useState, useEffect } from "react";
import BidCard from "./BidCard";
import { getData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { GuaranteeProps } from "@/src/types/BidCardTypes";
import Header from "@/components/Header/Header";
// import { RootState } from "@/src/store/types";
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
	streetAddress: string;
}

interface Customer {
	firstName: string;
	lastName: string;
}

interface RequestDetails {
	id: number;
	buildingType: string;
	createdTime: string;
	maxCost: number;
	name: string;
	powerRequest: number;
	status: string;
	address: Address;
}

interface Bid {
	id: number;
	cost: number;
	status: string;
	description: string;
	installationTime: string;
	request: RequestDetails;
	power: number;
	area: number;
	guarantee: GuaranteeProps;
}

interface status {
	id: number;
	name: string;
}

export default function Bids() {
	const [bidData, setBidData] = useState<Bid[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [statuses, setStatuses] = useState<status[] | null>(null);
	const [status, setStatus] = useState<string>("1");

	const corpId = useSelector((state: RootState) => state.user.corpId);
	const updateBids = () => {
		setLoading(true);
		getData({ endPoint: `/v1/corp/${corpId}/bid/status` })
			.then((data) => {
				setStatuses(data?.data);
				getData({
					endPoint: `/v1/corp/${corpId}/bid?status=${status}&offset=100&limit=1`,
				})
					.then((data) => {
						console.log("data", data);
						setBidData(data?.data);
					})
					.catch((err) => console.log(err))
					.finally(() => setLoading(false));
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		updateBids();
		// getData({ endPoint: `/v1/corp/${corpId}/guarantee?status=1` })
		// 	.then((data) => {
		// 		console.log("garanti", data);
		// 	})
		// 	.catch((err) => console.log(err));
	}, [status]);

	return (
		<>
			<div className="flex place-items-center">
				<Header header="پیشنهادهای ارسال شده" />
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
							<SelectValue placeholder="وضعیت پیشنهاد" />
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
			<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden bg-[#F0EDEF] shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
				{loading ? (
					<LoadingSpinner />
				) : bidData && bidData?.length > 0 ? (
					bidData?.map((bid, index) => (
						<BidCard
							key={index}
							id={bid?.id}
							price={bid?.cost}
							date={bid?.installationTime}
							power={bid?.power}
							area={bid?.area}
							status={bid?.status}
							description={bid?.description}
							panelName={bid?.request?.name}
							buildingType={bid?.request?.buildingType}
							address={bid?.request?.address}
							guaranteeID={bid?.guarantee?.id}
							updateBids={updateBids}
						/>
					))
				) : (
					<div>
						<NoRecordFound text="هیچ پیشنهادی یافت نشد." />
					</div>
				)}
			</div>
		</>
	);
}
