"use client";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import PanelCard from "@/components/Panel/PanelCard/PanelCard";
import { getData } from "@/src/services/apiHub";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";

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

interface status {
	id: number;
	name: string;
}

const Settings = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [panels, setPanels] = useState<PanelProps[]>([]);
	const [statuses, setStatuses] = useState<status[] | null>(null);
	const [status, setStatus] = useState<string>("1");
	useEffect(() => {
		setLoading(true);
		getData({
			endPoint: `/v1/user/installation/panel?status=${status}&offset=10&limit=15`,
		})
			.then((data) => {
				setPanels(data?.data);
				getData({ endPoint: `/v1/installation/panel/status` })
					.then((data) => {
						setStatuses(data?.data);
					})
					.catch((err) => console.log(err))
					.finally(() => setLoading(false));
			})
			.catch((err) => console.log(err));
	}, [status]);
	return (
		<PageContainer>
			<div className="flex place-items-center">
				<Header header="پنل‌های من" />
				{statuses && (
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
							<SelectValue placeholder="وضعیت گارانتی" />
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
			{/* <FilterSection /> */}
			<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden border-1 border-gray-200 shadow-[-6px_-6px_16px_rgba(255,255,255,1),6px_6px_16px_rgba(0,0,0,0.3)]">
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
					<NoRecordFound />
				) : (
					<></>
				)}
			</div>
		</PageContainer>
	);
};

export default Settings;
