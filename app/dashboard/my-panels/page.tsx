"use client";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import PanelCard from "@/components/Panel/PanelCard/PanelCard";
import { getData } from "@/src/services/apiHub";
import panelNotFound from "@/public/images/panelNotFound/panelNotFound.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import FilterSection from "@/components/CorpDashboard/FilterSection";

interface PanelProps {
	id: number;
	name: string;
	status: string;
	buildingType: string;
	area: number;
	power: number;
	tilt: number;
	azimuth: number;
	totalNumberOfModules: number;
	guaranteeStatus: string;
	address: Address;
	corporation: {
		id: number;
		name: string;
		logo: string;
		addresses: Address[];
	};
}

const Settings = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [panels, setPanels] = useState<PanelProps[]>([]);
	useEffect(() => {
		setLoading(true);
		getData({
			endPoint: `/v1/user/installation/panel?status=1&offset=10&limit=15`,
		})
			.then((data) => {
				setPanels(data?.data);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);
	return (
		<PageContainer>
			<div className="flex">
				<Header header="پنل‌های من" />
				{/* <div className="w-full place-items-end">
					<p>select filter</p>
				</div> */}
			</div>
			{/* <FilterSection /> */}
			<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden border-1 mt-2 border-gray-200 shadow-[-6px_-6px_16px_rgba(255,255,255,1),6px_6px_16px_rgba(0,0,0,0.3)]">
				{loading ? (
					<LoadingSpinner />
				) : panels.length > 0 ? (
					panels.map((panel: PanelProps, index) => (
						<PanelCard
							key={index}
							id={String(panel?.id)}
							panelName={panel.name}
							technicalDetails={{
								capacity: panel.power,
								todayProduction: 1210,
								efficiency: 92,
							}}
							status={panel.status}
							address={`استان ${panel.address.province}، شهر ${panel.address.city}، ${panel.address.streetAddress}`}
						/>
					))
				) : panels ? (
					<div className="relative text-center place-items-center py-18 bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]">
						<Image
							className="w-1/3"
							src={panelNotFound}
							alt="orderNotFound"
						/>
						<div className="">
							<p
								className="mt-6 text-navy-blue font-bold rtl"
								style={{ fontSize: "1.1rem" }}
							>
								هیچ پنلی یافت نشد.
							</p>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</PageContainer>
	);
};

export default Settings;
