import React from "react";
import { useEffect, useState } from "react";
import RequestCard from "./RequestCard/RequestCard";
import { baseURL } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
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

interface Request {
	id: number;
	name: string;
	customer: Customer;
	address: address;
	powerRequest: number;
	status: string;
	maxCost: number;
}

export default function Requests() {
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [requestData, setRequestData] = useState<Request[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		console.log("accessToken", accessToken);
		const fetchRequests = async () => {
			try {
				console.log("Fetching Requests...");
				const response = await fetch(`${baseURL}/v1/bids/list`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				const data = await response.json();
				console.log("Raw response:", data.data);
				setRequestData(data.data);
				setLoading(false);
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
						panelName: request.name,
						customerName: `${request.customer.firstName} ${request.customer.lastName}`,
						address: `${request.address.province}، ${request.address.city}، ${request.address.streetAddress}`,
						capacity: request.powerRequest,
						price: request.maxCost,
					}}
					requestId={request.id}
				/>
			))}

			<RequestCard
				panelDetails={{
					panelName: "پنل خانه تهرانپارس",
					customerName: "مجتبی قاطع",
					address:
						"فلکه شانزدهم تهرانپارس، حیدرخانی، کوچه پارسا، پلاک 134",
					capacity: 5000,
					price: 200000,
				}}
				requestId={1}
			/>
			<RequestCard
				panelDetails={{
					panelName: "پنل باغ شهری",
					customerName: "رضا موسوی نارنجی",
					address:
						" ایران، استان کبیر اردبیل، نرسیده ترکیه، 200 کیلومتری ارومیه، کنار دریای خزر، خیابان باقلوا، کوچه خوشمزه، پلاک 104، درب انتهای کوچه سبز خراسان رضوی شمالی نبش میدان بنفش",
					capacity: 200,
					price: 120050780123406,
				}}
				requestId={1}
			/>
		</div>
	);
}
