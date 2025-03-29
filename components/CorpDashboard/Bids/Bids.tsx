import React, { useState, useEffect } from "react";
import BidCard from "./BidCard";
import { accessToken, baseURL, getData } from "@/src/services/apiHub";

interface address {
	province: string;
	city: string;
	streetAddress: string;
}

interface Customer {
	firstName: string;
	lastName: string;
}

interface Bid {
	id: number;
	installationRequest: {
		name: string;
		customer: Customer;
		address: address;
		powerRequest: number;
	};
	status: string;
	cost: number;
}

export default function Bids() {
	// const accessToken =
	// 	"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDU0MDcwMzcsImlhdCI6MTc0MjgxNTAzNywic3ViIjoxfQ.U245pmQco3hU0VATsXU8hovIl75FCpvcPGHDef0BVtRqPny5A9LBMMHRNcD4hQk9OciVS8v-kMYQvyuGsq6ido2ebNVFhIR0Vja023B48S5tW3yzSOyySEvcLEt3pWxTRQo45mK9GLBRtdpQu18qoKqreHOzr98K2mTd4E7lVE8";
	const [bidData, setBidData] = useState<Bid[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBids = async () => {
			try {
				console.log("Fetching bids...");
				const response = await fetch(`${baseURL}/v1/bids/list`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"ngrok-skip-browser-warning": "69420",
					},
				});

				const data = await response.json();
				console.log("Raw response:", data.data);
				setBidData(data.data);
			} catch (error: any) {
				console.error("Error fetching bids:", {
					message: error.message,
					response: error.response?.data,
					status: error.response?.status,
				});
				setError(error.message);
			}
		};

		fetchBids();
	}, [accessToken]);

	if (error) {
		return <div className="text-red-500">Error loading bids: {error}</div>;
	}

	if (!bidData) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden bg-[#F4F1F3] shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
			{bidData.map((bid) => (
				<BidCard
					key={bid.id}
					panelDetails={{
						panelName: bid.installationRequest.name,
						customerName:
							bid.installationRequest.customer.firstName +
							" " +
							bid.installationRequest.customer.lastName,
						address:
							bid.installationRequest.address.province +
							"، " +
							bid.installationRequest.address.city +
							"، " +
							bid.installationRequest.address.streetAddress,
						capacity: bid.installationRequest.powerRequest, //
						price: bid.cost, //
					}}
					status={bid.status}
				/>
			))}
			{/* <BidCard
				panelDetails={{
					panelName: "پنل خانه تهرانپارس",
					customerName: "مجتبی قاطع",
					address:
						"فلکه شانزدهم تهرانپارس، حیدرخانی، کوچه پارسا، پلاک 134",
					capacity: 5000,
					price: 200000,
				}}
				status="confirmed"
			/>
			<BidCard
				panelDetails={{
					panelName: "پنل باغ شهری",
					customerName: "رضا موسوی نارنجی",
					address:
						"ایران، استان کبیر اردبیل، نرسیده ترکیه، 200 کیلومتری ارومیه، کنار دریای خزر، خیابان باقلوا، کوچه خوشمزه، پلاک 104، درب انتهای کوچه سبز",
					capacity: 200,
					price: 120050780123406,
				}}
				status="pending"
			/> */}
		</div>
	);
}
