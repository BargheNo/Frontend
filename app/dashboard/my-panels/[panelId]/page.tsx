"use client";

import LiveChart from "@/components/Panel/LiveChart/LiveChart";
import {
	SquareMenu,
	Map,
	Building2,
	MapPinHouse,
	LandPlot,
} from "lucide-react";

const Item = ({
	icon: Icon,
	fieldName,
	fieldValue,
}: {
	icon: React.ElementType;
	fieldName: string;
	fieldValue: string | number;
}) => {
	return (
		<div className="flex items-start gap-2">
			<Icon className="min-w-6 min-h-6 transition-transform duration-200 hover:scale-115 text-[#FA682D]" />
			<div className="flex gap-1">
				<span>{fieldName}: </span>
				<span className="text-[#5E5E5E]">{fieldValue}</span>
			</div>
		</div>
	);
};
const PanelId = () => {
	// const PanelId = ({ params }: PanelProps) => {
	// const { panelId } = params; // Access the panelId from params
	return (
		<div className={`w-full px-12 my-7 flex flex-col gap-8`}>
			<div className={`grid grid-cols-2 gap-8`}>
				<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
					<LiveChart />
				</div>
				<div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
					<LiveChart />
				</div>
			</div>
			<div className="w-full text-gray-800 rounded-2xl shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
				<div className="border-t-1 border-gray-300 first:border-t-0 px-7 py-3">
					<Item
						icon={SquareMenu}
						fieldName="نام پنل"
						fieldValue="پنل تهرانپارس"
					/>
				</div>
				<div className="border-t-1 border-gray-300 first:border-t-0 px-7 py-3">
					<div className="flex w-full justify-between pb-3">
						<div className="flex items-start w-1/4">
							<Item
								icon={Map}
								fieldName="استان"
								fieldValue="تهران"
							/>
						</div>
						<div className="flex items-start w-3/4">
							<Item
								icon={Building2}
								fieldName="شهر"
								fieldValue="رباط کریم"
							/>
						</div>
					</div>
					<Item
						icon={MapPinHouse}
						fieldName="آدرس"
						fieldValue="خیابان طاهرخانی، 
						میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو میو 
						بلوار فضیلت، بن بست رضایی"
					/>
				</div>
				<div className="border-t-1 border-gray-300 first:border-t-0 px-7 py-3">
					<Item
						icon={LandPlot}
						fieldName="مساحت"
						fieldValue="70 متر مربع"
					/>
				</div>
			</div>
		</div>
	);
};

export default PanelId;
