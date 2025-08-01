import React, { useState, useEffect } from "react";
import BidCard from "./BidCard";
import { baseURL, getData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { GuaranteeProps } from "@/src/types/BidCardTypes";
import Header from "@/components/Header/Header";
// import { RootState } from "@/src/store/types";

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

export default function Bids() {
	const [bidData, setBidData] = useState<Bid[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const corpId = useSelector((state: RootState) => state.user.corpId);
	const updateBids = () => {
		setLoading(true);
		getData({
			endPoint: `/v1/corp/${corpId}/bid?status=1&offset=100&limit=1`,
		})
			.then((data) => {
				console.log("data", data);
				setBidData(data?.data);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};
	useEffect(() => {
		updateBids();
		getData({ endPoint: `/v1/corp/${corpId}/guarantee?status=1` })
			.then((data) => {
				console.log("garanti", data);
			})
			.catch((err) => console.log(err));
	}, []);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<Header header="پیشنهادهای ارسال شده" />
			<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden bg-[#F0EDEF] shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
				{bidData?.map((bid, index) => (
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
				))}
			</div>
		</>
	);
}
