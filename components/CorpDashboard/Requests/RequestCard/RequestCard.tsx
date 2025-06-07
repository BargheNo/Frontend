import IconWithBackground from "@/components/IconWithBackground/IconWithBackground";
import { RequestCardProps } from "@/src/types/RequestCardTypes";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
	ArrowLeft,
	Battery,
	Building2,
	CalendarRange,
	DollarSign,
	Eclipse,
	MapPin,
	User,
} from "lucide-react";
import React, { useState } from "react";
import wordExpression from "@/src/functions/Calculations";
import PlaceBidForm from "../../Bids/PlaceBidForm/PlaceBidForm";

const ItemWithBackground = ({
	icon: Icon,
	fieldName,
	fieldValue,
	smallValue = false,
	prefix,
	english = false,
}: {
	icon: React.ElementType;
	fieldName: string;
	fieldValue: string | number;
	smallValue?: boolean;
	prefix?: string;
	english?: boolean;
}) => {
	const { value, changed } = wordExpression(fieldValue, english);
	return (
		<div className="flex my-2 h-full gap-3">
			<div className="flex items-start">
				<IconWithBackground icon={Icon} />
			</div>
			<div className="flex gap-1 items-start">
				<span
					className={`${smallValue ? "text-xl" : "text-xl mt-[2px]"}`}
				>
					{fieldName}:{" "}
				</span>
				<span
					dir={english ? "ltr" : "rtl"}
					className={`text-black ${
						smallValue ? "mt-[3px]" : "font-bold text-2xl"
					}`}
				>
					{value}
					{changed && english ? "" : " "}
					{prefix}
				</span>
			</div>
		</div>
	);
};

export default function RequestCard({
	className,
	panelDetails,
	requestId,
}: RequestCardProps) {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<div
			className={`${className} w-full min-h-48 border-t-1 border-gray-300 first:border-t-0`}
		>
			<div className="flex flex-row justify-between w-full min-h-32 bg-[#F0EDEF] overflow-hidden relative">
				<div className="flex flex-row justify-between w-full">
					<div className="flex flex-col w-full p-6">
						<div className="flex w-4/5 h-4/5">
							<div className="flex flex-col">
								<ItemWithBackground
									icon={Building2}
									fieldName="نوع ساختمان"
									fieldValue={panelDetails.buildingType}
								/>
								<ItemWithBackground
									icon={CalendarRange}
									fieldName="زمان درخواست"
									fieldValue={panelDetails.createdTime}
								/>
								<ItemWithBackground
									icon={Battery}
									fieldName="ظرفیت مورد نیاز"
									fieldValue={panelDetails.capacity}
									prefix="W"
									english={true}
								/>
								<ItemWithBackground
									icon={DollarSign}
									fieldName="قیمت مد نظر"
									fieldValue={panelDetails.price}
									prefix="تومان"
								/>
							</div>
							{/* <div className="w-2/5 flex flex-col justify-between h-full">
								<ItemWithBackground
									icon={Battery}
									fieldName="ظرفیت مورد نیاز"
									fieldValue={panelDetails.capacity}
									prefix="W"
									english={true}
								/>
								<ItemWithBackground
									icon={DollarSign}
									fieldName="قیمت مد نظر"
									fieldValue={panelDetails.price}
									prefix="تومان"
								/>
							</div>
							<div className="w-2/5 flex flex-col justify-between px-4 py-4 h-full">
								<ItemWithBackground
									icon={Building2}
									fieldName="نوع ساختمان"
									fieldValue={panelDetails.buildingType}
								/>
								<ItemWithBackground
									icon={CalendarRange}
									fieldName="زمان درخواست"
									fieldValue={panelDetails.createdTime}
								/>
							</div> */}
						</div>
						<div className="w-4/5 h-1/5">
							<ItemWithBackground
								icon={MapPin}
								fieldName="آدرس"
								fieldValue={panelDetails.address}
								smallValue={true}
							/>
						</div>
					</div>
					<div className="flex flex-col justify-evenly w-1/5 items-center text-center">
						{/* <div className="flex flex-col shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)] rounded-md px-4 mx-4 my-4 py-2">
							<span>پیشنهادهای ارسال شده</span>
							<span className="text-3xl font-bold" dir="rtl">
								{sentRequestsCount}/5
							</span>
						</div> */}
						<div className="flex flex-col items-center gap-2">
							<Dialog open={open} onOpenChange={setOpen}>
								<DialogTrigger asChild>
									<div className="flex flex-col items-center gap-4 hover:cursor-pointer">
										<div className="bg-gradient-to-b from-[#EE4334] to-[#D73628] rounded-full w-16 h-16 flex items-center place-content-center text-white cursor-pointer shadow-md hover:shadow-lg transition duration-300 hover:scale-105">
											<ArrowLeft />
										</div>
										<span className="flex content-center">
											مشاهده جزئیات
										</span>
									</div>
								</DialogTrigger>

								<DialogContent className="rtl sm:max-w-[425px] min-w-[70vw] border-0 overflow-scroll">
									<PlaceBidForm
										setOpen={setOpen}
										requestId={requestId}
										panelDetails={panelDetails}
									/>
								</DialogContent>
							</Dialog>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
