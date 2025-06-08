import React from "react";
import { useEffect, useState } from "react";
import RequestCard from "./RequestCard/RequestCard";
import { baseURL, getData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import DateConverter from "@/src/functions/toJalali";
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

export default function Requests() {
	const [loading, setLoading] = useState<boolean>(true);
	const [requestData, setRequestData] = useState<Request[] | null>(null);

	const corpId = useSelector((state: RootState) => state.user.corpId);
	useEffect(() => {
		getData({
			endPoint: `${baseURL}/v1/corp/${corpId}/installation/request?status=5&offset=100&limit=1`,
		})
			.then((data) => {
				setRequestData(data.data);
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden bg-[#F0EDEF] shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
			{requestData?.map((request) => (
				<RequestCard
					key={request.id}
					panelDetails={{
						panelName: request?.name,
						address: `استان ${request?.address?.province}، شهر ${request?.address?.city}`,
						capacity: request?.powerRequest,
						price: request?.maxCost,
						buildingType: request?.buildingType,
						status: request?.status,
						createdTime: DateConverter(request?.createdTime),
						// createdTime: request?.createdTime,
					}}
					requestId={request?.id}
				/>
			))}

			{/* <RequestCard
				panelDetails={{
					panelName: "پنل خانه تهرانپارس",
					customerName: "مجتبی قاطع",
					address:
						"فلکه شانزدهم تهرانپارس، حیدرخانی، کوچه پارسا، پلاک 134",
					capacity: 5000,
					price: 200000,
				}}
				requestId={1}
			/> */}
			{/* <RequestCard
				panelDetails={{
					panelName: "پنل باغ شهری",
					address:"استان تهران، شهر تهران", 
					capacity: 200,
					price: 1200507,
          buildingType: "مسکونی",
          createdTime: "1404/01/01",
          status: "active"
				}}
				requestId={1}
			/> */}
		</div>
	);
}
