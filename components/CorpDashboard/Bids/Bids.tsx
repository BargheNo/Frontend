import React, { useState, useEffect, useCallback } from "react";
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
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";
import FilterSection from "../../FilterSection/FilterSection";

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
	// const [statuses, setStatuses] = useState<status[] | null>(null);
	const [status, setStatus] = useState<string>("1");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [resultPerPage, setResultPerPage] = useState<string>("");
	const [searchPhrase, setSearchPhrase] = useState<string>("");

	const corpId = useSelector((state: RootState) => state.user.corpId);
	// const updateBids = useCallback(() => {
	// 	setLoading(true);
	// 	getData({ endPoint: `/v1/corp/${corpId}/bid/status` })
	// 		.then((data) => {
	// 			setStatuses(data?.data);
	// 			getData({
	// 				endPoint: `/v1/corp/${corpId}/bid?status=${status}&pageSize=20`,
	// 			})
	// 				.then((data) => {
	// 					console.log("data", data);
	// 					setBidData(data?.data);
	// 				})
	// 				.catch((err) => console.log(err))
	// 				.finally(() => setLoading(false));
	// 		})
	// 		.catch((err) => console.log(err));
	// }, [corpId, status]);

	const updateBids = useCallback(() => {
		setLoading(true);
		getData({
			endPoint: `/v1/corp/${corpId}/bid`,
			params: { status, pageSize: resultPerPage },
		})
			.then((data) => {
				console.log("data", data);
				setBidData(data?.data);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [status, resultPerPage, corpId]);

	useEffect(() => {
		updateBids();
		// getData({ endPoint: `/v1/corp/${corpId}/guarantee?status=1` })
		// 	.then((data) => {
		// 		console.log("garanti", data);
		// 	})
		// 	.catch((err) => console.log(err));
	}, [updateBids]);

	return (
		<>
			<div className="flex place-items-center">
				<FilterSection
					fieldName="پنل"
					headerName="پیشنهادهای ارسال شده"
					statusesListApiRoute={`/v1/corp/${corpId}/bid/status`}
					status={status}
					setStatus={setStatus}
					// resultPerPage={resultPerPage}
					// setResultPerPage={setResultPerPage}
					// searchPhrase={searchPhrase}
					// setSearchPhrase={setSearchPhrase}
					// onSearchSubmit={() => updateBids()}
				/>
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
			<CustomPagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPages={1}
			/>
		</>
	);
}
