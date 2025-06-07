import React from "react";
import { useEffect, useState } from "react";
import RequestCard from "./RequestCard/RequestCard";
import { baseURL, getData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import DateConverter from "@/src/functions/toJalali";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
// import { RootState } from "@/src/store/types";
// import moment from "moment-jalaali";
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

// moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

// const DateConverter = (miladiDate: any) => {
//   return `${moment(miladiDate).format("jYYYY/jMM/jDD")}`;
// };

export default function Requests() {
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [requestData, setRequestData] = useState<Request[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	const corpId = useSelector((state: RootState) => state.user.corpId);
	useEffect(() => {
		console.log("accessToken", accessToken);
		const fetchRequests = async () => {
			try {
				console.log("Fetching Requests...");
				getData({
					endPoint: `${baseURL}/v1/corp/${corpId}/installation/request?status=5&offset=1&limit=1`,
				})
					.then((data) => {
						setRequestData(data.data);
						setLoading(false);
						console.log(data);
					})
					.catch((err) => {
						CustomToast(generateErrorMessage(err));
						console.log(err);
					});
				// const response = await fetch(
				// 	`${baseURL}/v1/corp/${corpId}/installation/request?status=5&offset=1&limit=1`,
				// 	{
				// 		headers: {
				// 			Authorization: `Bearer ${accessToken}`,
				// 		},
				// 	}
				// );

				// const data = await response.json();
				// console.log("Raw response:", data.data);
			} catch (error: any) {
				console.error("Error fetching requests:", {
					message: error.message,
					response: error.response?.data,
					status: error.response?.status,
				});
				setError(error.message);
				setLoading(false);
			}
		};

		fetchRequests();
	}, [accessToken]);

	// if (error) {
	// 	return (
	// 		<div className="text-red-500">Error loading requests: {error}</div>
	// 	);
	// }

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
