import React from "react";
import { MoveLeft, Sun, Battery, Calendar, MapPin } from "lucide-react";
import { PanelCardProps } from "@/src/types/PanelCardTypes";

const PanelCard = ({
	panelName,
	technicalDetails,
	address,
}: PanelCardProps) => {
	// Determine status color based on efficiency
	const getStatusColor = () => {
		const efficiency = technicalDetails.efficiency;
		if (efficiency >= 80)
			return "bg-gradient-to-br from-green-400 to-green-500 border-1 border-gray-100/50 shadow-sm shadow-green-500";
		if (efficiency >= 60)
			return "bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-yellow-500";
		return "bg-gradient-to-br from-red-400 to-red-500 shadow-red-500";
	};

	// Format numbers with commas for better readability
	const formatNumber = (num: number): string => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	// Function to wrap icons with a rounded background
	const IconWithBackground = ({
		icon: Icon,
		color,
	}: {
		icon: React.ElementType;
		color: string;
	}) => (
		<div
			className={`p-2 rounded-xl bg-[#eff0f1] shadow-[-4px_-4px_10px_rgba(255,255,255,1),2px_2px_5px_rgba(0,0,0,0.3)]`}
		>
			<Icon className="w-4 h-4" style={{ color }} />
		</div>
	);

	return (
		<div className="w-full h-64 border-t-1 border-gray-300 first:border-t-0">
			<div className="flex flex-row justify-between w-full h-full bg-[#F0EDEF] p-5 overflow-hidden relative">
				{/* Left Section: Panel Details */}
				<div className="flex flex-col justify-between w-2/3 z-10">
					<div className="space-y-3">
						<h2 className="text-2xl font-bold text-gray-800">
							{panelName}
						</h2>
						<div className="space-y-2">
							<div className="flex items-center text-sm text-gray-700">
								<IconWithBackground
									icon={Battery}
									color="#6B7280"
								/>
								<span className="font-medium ml-1">ظرفیت:</span>
								<span className="mr-1">
									{formatNumber(technicalDetails.capacity)} kW
								</span>
							</div>
							<div className="flex items-center text-sm text-gray-700">
								<IconWithBackground
									icon={Sun}
									color="#F59E0B"
								/>
								<span className="font-medium ml-1">
									تولید امروز:
								</span>
								<span className="mr-1">
									{formatNumber(
										technicalDetails.todayProduction
									)}{" "}
									kWh
								</span>
							</div>
							<div className="flex items-center text-sm text-gray-700">
								<IconWithBackground
									icon={Calendar}
									color="#3B82F6"
								/>
								<span className="font-medium ml-1">
									بازدهی:
								</span>
								<span className="mr-1">
									{technicalDetails.efficiency}%
								</span>
							</div>
						</div>
					</div>
					<div className="flex items-start text-sm text-gray-700 mt-2">
						<IconWithBackground icon={MapPin} color="#6B7280" />
						<div>
							<span className="font-medium ml-1">آدرس:</span>
							<span className="mr-1">{address}</span>
						</div>
					</div>
				</div>

				{/* Right Section: Status and Action Button */}
				<div className="flex flex-col gap-4 items-center z-10">
					<div className="text-gray-700 font-medium">وضعیت پنل:</div>
					<div className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#F0F0F3] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)] w-24">
						<div
							className={`h-4 w-4 rounded-full ${getStatusColor()} shadow-md`}
						></div>
						<span className="text-sm font-medium text-gray-600">
							فعال
						</span>
					</div>
					<button className="flex items-center justify-between bg-gradient-to-r from-[#EE4334] to-[#D73628] px-4 py-2 text-white cursor-pointer shadow-md rounded-full hover:shadow-lg transition duration-300 hover:scale-105">
						<span className="font-medium">مدیریت پنل</span>
						<MoveLeft className="ml-2 w-4 h-4" />
					</button>
				</div>

				{/* Decorative background element */}
				{/* <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-50 to-transparent rounded-full opacity-20 -mr-8 -mt-8"></div> */}
			</div>
		</div>
	);
};

export default PanelCard;
