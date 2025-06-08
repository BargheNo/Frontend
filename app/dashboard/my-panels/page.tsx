"use client";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import PanelCard from "@/components/Panel/PanelCard/PanelCard";
import { getData } from "@/src/services/apiHub";
import panelNotFound from "@/public/images/panelNotFound/panelNotFound.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";

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
			endPoint: `/v1/user/installation/panel?status=1&offset=5&limit=1`,
		})
			.then((data) => {
				console.log(data);
				setPanels(data?.data);
			})
			.finally(() => setLoading(false));
	}, []);
	return (
		// <div className="min-h-full flex flex-col text-white py-8 px-14 bg-transparent">
		<PageContainer>
			<Header header="پنل‌های من" />
			<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
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
								todayProduction: 12.3,
								efficiency: 92,
							}}
              status={panel.status}
							address={`استان ${panel.address.province}، شهر ${panel.address.city}، ${panel.address.streetAddress}`}
						/>
					))
				) : panels ? (
					<div className="text-center place-items-center mt-6">
						<Image
							className="w-1/3"
							src={panelNotFound}
							alt="orderNotFound"
						/>
						<div className="-mt-8">
							<p
								className=" mt-6 text-navy-blue font-bold rtl"
								style={{ fontSize: "1.1rem" }}
							>
								هیچ پنلی یافت نشد.
							</p>
						</div>
					</div>
				) : (
					<></>
				)}
				{/* <PanelCard
					id="8"
					panelName="پنل باغ 1"
					technicalDetails={{
						capacity: 5.2,
						todayProduction: 12.3,
						efficiency: 92,
					}}
					address="ایران، استان البرز، شهر کرج، دویست متری باغ های مهرشهر، قبل از تقاطع خیابانی و 
          تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار
          مرتضی مطهری، خیابان مرحوم مرتضی پاشایی، کوچه خوش صدایان، سمت راست پلاک 447 واحد 12"
				/>
				<PanelCard
					id="2"
					panelName="پنل باغ 2"
					technicalDetails={{
						capacity: 5.2,
						todayProduction: 12.3,
						efficiency: 92,
					}}
					address="باغ شیراز"
				/>
				<PanelCard
					id="3"
					panelName="پنل باغ 3"
					technicalDetails={{
						capacity: 5.2,
						todayProduction: 12.3,
						efficiency: 92,
					}}
					address="باغ تالش"
				/> */}
			</div>
		</PageContainer>
		// </div>
	);
};

export default Settings;
