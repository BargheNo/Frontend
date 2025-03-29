import CustomInput from "@/components/CustomInput/CustomInput";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { vazir } from "@/lib/fonts";
import { DialogTitle } from "@radix-ui/react-dialog";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { accessToken, baseURL, postData } from "@/src/services/apiHub";
import {
	Battery,
	Calendar,
	DollarSign,
	Eclipse,
	MapPin,
	MessageCircle,
	User,
} from "lucide-react";
import { toast } from "sonner";
import styles from "./PlaceBidForm.module.css";
import React from "react";
import { BidFormProps } from "@/src/types/RequestCardTypes";
import wordExpression from "@/src/functions/Calculations";

const Item = ({
	icon: Icon,
	fieldName,
	fieldValue,
	english = false,
	prefix,
}: {
	icon: React.ElementType;
	fieldName: string;
	fieldValue: string | number;
	english?: boolean;
	prefix?: string;
}) => {
	const { value, changed } = wordExpression(fieldValue, english);
	return (
		<div className="flex items-start gap-2 border-t-2 first:border-t-0 border-gray-300 w-full py-2">
			<Icon className="min-w-6 min-h-6 transition-transform duration-200 hover:scale-115 text-[#FA682D]" />
			<div className="flex gap-1">
				<span>{fieldName}: </span>
				<span className="text-[#5E5E5E]">
					{value}
					{changed && english ? "" : " "}
					{prefix}
				</span>
			</div>
		</div>
	);
};

export default function PlaceBidForm({
	requestId,
	panelDetails,
}: BidFormProps) {
	// const accessToken = localStorage.getItem("accessToken");
	const validateSchema = Yup.object({
		time: Yup.string().required("زمان تخمینی خود را وارد کنید."),
		price: Yup.string().required("قیمت پیشنهادی خود را وارد کنید."),
		message: Yup.string().max(500, "پیام بسیار طولانی است."),
	});
	const handleBid = async (
		requestId: number,
		price: number,
		time: string,
		message: string
	) => {
		  fetch(`${baseURL}/v1/bids/set`, {
			method: "POST", 
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				installationRequestId: requestId,
				cost: price,
				description: message,
				installationDate: "2025-04-15T00:00:00Z",
			}),
		})
			.then((response) => response.json()) // Parse the JSON response
			.then((data) => {
				toast(data?.message);
				console.log("Success:", data); // Handle the response data
			})
			.catch((error) => {
				console.error("Error:", error); // Handle errors
			});
		// postData({
		// 	endPoint: `${baseURL}/v1/bids/set`,
		// 	data: {
		// 		installationRequestId: requestId,
		// 		cost: price,
		// 		description: message,
		// 		installationDate: "2025-04-15T00:00:00Z",
		// 	},
		// })
		// 	.then((res) => {
		// 		console.log(res);
		// 		toast(res?.data?.message);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		toast(err?.response?.data?.message);
		// 	});
	};
	return (
		<Formik
			initialValues={{
				price: "",
				time: "",
				message: "",
			}}
			validationSchema={validateSchema}
			onSubmit={(values) => {
				handleBid(
					requestId,
					Number(values.price),
					values.time,
					values.message
				);
			}}
		>
			<Form className="w-full flex flex-col gap-6">
				<DialogHeader>
					<DialogTitle className={`flex ${vazir.className} text-2xl`}>
						ثبت پیشنهاد
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-1">
					<span className="text-lg font-bold">مشخصات درخواست</span>
					<div className={styles.Box}>
						<Item
							icon={Eclipse}
							fieldName="نام پنل"
							fieldValue={panelDetails.panelName}
						/>
						<Item
							icon={User}
							fieldName="مشتری"
							fieldValue={panelDetails.customerName}
						/>
						<Item
							icon={Battery}
							fieldName="ظرفیت"
							fieldValue={panelDetails.capacity}
							english={true}
							prefix="W"
						/>
						<Item
							icon={MapPin}
							fieldName="آدرس"
							fieldValue={panelDetails.address}
						/>
					</div>
				</div>
				<div className="w-full">
					<div className="flex flex-row justify-evenly gap-6">
						<CustomInput
							placeholder="قیمت پیشنهادی شما"
							name="price"
							icon={DollarSign}
							type="number"
							autoFocus={true}
							containerClassName="w-1/2"
						>
							{" "}
						</CustomInput>
						<CustomInput
							placeholder="زمان تخمینی نصب"
							name="time"
							icon={Calendar}
							type="number"
							containerClassName="w-1/2"
						>
							{" "}
						</CustomInput>
						{/* <CustomInput placeholder="آپلود فایل قرارداد" name="file" icon={DollarSign}  type="text" > </CustomInput> */}
					</div>
					<CustomInput
						placeholder="پیام شما"
						name="message"
						icon={MessageCircle}
						type="text"
						containerClassName="w-full"
					>
						{" "}
					</CustomInput>
				</div>

				<DialogFooter>
					<button
						type="submit"
						className={`${vazir.className} ml-3 bg-[#11B33A] hover:cursor-pointer shadow-md rounded-md px-2 py-1 text-white`}
					>
						ارسال پیشنهاد
					</button>
				</DialogFooter>
			</Form>
		</Formik>
	);
}
