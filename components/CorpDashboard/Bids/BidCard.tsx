import IconWithBackground from "@/components/IconWithBackground/IconWithBackground";
import DateConverter from "@/src/functions/toJalali";
import {
	ArrowLeft,
	Battery,
	Building2,
	CalendarDays,
	CalendarRange,
	DollarSign,
	Eclipse,
	LandPlot,
	MapPin,
	MessageCircle,
	User,
} from "lucide-react";
import styles from "./BidCard.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { getData, putData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { CustomDatePicker } from "@/components/Custom/CustomDatePicker/CustomDatePicker";
interface BidInfo {
	id: number;
	price: number;
	date: string;
	power: number;
	status: string;
	area: number;
	description: string;
	panelName: string;
	buildingType: string;
	address: Address;
	updateBids: any;
}

interface BidSchema {
	cost: string;
	area: string;
	power: string;
	installationTime: string;
	description: string;
	guaranteeID: string;
	paymentTerms: { method: string };
}

const validateSchema = Yup.object({
	cost: Yup.string().required("قیمت پیشنهادی الزامی است"),
	area: Yup.string().required("مساحت الزامی است"),
	power: Yup.string().required("ظرفیت الزامی است"),
	installationTime: Yup.string().required("زمان تخمینی نصب الزامی است"),
	description: Yup.string().max(500, "توضیحات طولانی است"),
	guaranteeID: Yup.string().required("نوع گارانتی الزامی است"),
	paymentTerms: Yup.object().shape({
		method: Yup.string().required("نحوه پرداخت الزامی است"),
	}),
});

function wordExpression(value: number | string, english: boolean) {
	if (typeof value === "number") {
		if (english) {
			if (value > 1e3) return { value: `${value / 1e3}k`, changed: true };
			if (value > 1e6) return { value: `${value / 1e6}M`, changed: true };
			if (value > 1e9) return { value: `${value / 1e9}G`, changed: true };
			return { value: `${value}`, changed: true };
		} else {
			let res = "";
			let found = false;
			if (Math.round(value / 1e12) !== 0) {
				res += `${Math.round(value / 1e12)} تیلیارد`;
				found = true;
			}
			if (Math.round(value / 1e9) % 1000 !== 0) {
				if (found) res += " و ";
				res += `${Math.round(value / 1e9) % 1000} میلیارد`;
				found = true;
			}
			console.log("m:", Math.round(value / 1e9) % 1000);
			if (Math.round(value / 1e6) % 1000 !== 0) {
				if (found) res += " و ";
				res += `${Math.round(value / 1e6) % 1000} میلیون`;
				found = true;
			}
			if (Math.round(value / 1e3) % 1000 !== 0) {
				if (found) res += " و ";
				res += `${Math.round(value / 1e3) % 1000} هزار`;
				found = true;
			}
			if (Math.round(value) % 1000 !== 0) {
				if (found) res += " و ";
				res += `${Math.round(value) % 1000}`;
			}

			return { value: res, changed: true };
		}
	}
	return { value: value, changed: false };
}

const Item = ({
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

const DialogItem = ({
	icon: Icon,
	fieldName,
	fieldValue,
	english = false,
	prefix,
	className,
}: {
	icon: React.ElementType;
	fieldName: string;
	fieldValue: string | number;
	english?: boolean;
	prefix?: string;
	className?: string;
}) => {
	const { value, changed } = wordExpression(fieldValue, english);
	return (
		<div
			className={`flex items-start gap-2 border-t-2 first:border-t-0 border-gray-300 w-full py-2 ${className}`}
		>
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

export default function BidCard({
	id,
	panelName,
	price,
	date,
	power,
	area,
	description,
	buildingType,
	address,
	status,
	updateBids,
}: BidInfo) {
	const [open, setOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
	const corpId = useSelector((state: RootState) => state.user.corpId);

	const initialValues = {
		cost: price,
		area: area,
		power: power,
		description: description,
		installationTime: date,
		guaranteeID: 1,
		paymentTerms: { method: 1 },
	};

	useEffect(() => {
		getData({ endPoint: `/v1/corp/${corpId}/bid/${id}` }).then((data) => {
			console.log(`data of bid ${id}`, data);
		});
	}, []);

	const cancelBid = () => {
		setDeleteLoading(true);
		putData({ endPoint: `/v1/corp/${corpId}/bid/${id}/cancel` })
			.then((data) => {
				CustomToast(data?.message, "success");
				setOpen(false);
			})
			.finally(() => setDeleteLoading(false));
	};

	const updateBid = (values: BidSchema) => {
		setLoading(true);
		const formData = {
			cost: values.cost,
			area: values.area,
			power: values.power,
			description: values.description,
			installationTime: values.installationTime,
			guaranteeID: values.guaranteeID,
			paymentTerms: values.paymentTerms,
		};
		console.log(formData);
		putData({
			endPoint: `/v1/corp/${corpId}/bid/${id}`,
			data: formData,
		})
			.then((data) => {
				CustomToast(data?.message, "success");
				setOpen(false);
				updateBids();
			})
			.finally(() => setLoading(false));
	};

	const getStatusColor = () => {
		if (status === "تایید")
			return "bg-gradient-to-br from-green-400 to-green-500 border-1 border-gray-100/50 shadow-sm shadow-green-500";
		if (status === "pending")
			return "bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-yellow-500";
		return "bg-gradient-to-br from-red-400 to-red-500 shadow-red-500";
	};
	return (
		<div
			className={`w-full min-h-64 border-t-1 border-gray-300 first:border-t-0`}
		>
			<div className="flex flex-row justify-between w-full min-h-64 bg-[#F0EDEF] overflow-hidden relative">
				<div className="flex flex-row justify-between w-full min-h-64">
					<div className="w-4/5 flex flex-col justify-between px-4 py-4 h-full">
						<Item
							icon={Eclipse}
							fieldName="نام پنل"
							fieldValue={panelName}
						/>
						{/* <Item
							icon={MapPin}
							fieldName="آدرس"
							fieldValue={address}
							smallValue={true}
						/> */}
						<Item
							icon={Battery}
							fieldName="ظرفیت"
							fieldValue={power}
							prefix="W"
							english={true}
						/>
						<Item
							icon={CalendarDays}
							fieldName="زمان تخمینی نصب"
							fieldValue={DateConverter(date)}
							english={true}
						/>
						<Item
							icon={DollarSign}
							fieldName="قیمت پیشنهادی شما"
							fieldValue={price}
							prefix="تومان"
						/>
					</div>
					<div className="flex flex-col justify-evenly w-1/5 items-center text-center">
						<div className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#F0F0F3] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)] w-32">
							<div
								className={`h-4 w-4 rounded-full ${getStatusColor()} shadow-md`}
							/>
							<span className="text-sm font-medium text-gray-600">
								{status}
							</span>
						</div>
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger asChild>
								<div className="flex flex-col items-center gap-2">
									<div className="bg-gradient-to-b from-[#EE4334] to-[#D73628] rounded-full w-16 h-16 flex items-center place-content-center text-white cursor-pointer shadow-md hover:shadow-lg transition duration-300 hover:scale-105">
										<ArrowLeft />
									</div>
									<span>مشاهده جزئیات</span>
								</div>
							</DialogTrigger>
							<DialogContent
								style={{ backgroundColor: "#F1F4FC" }}
								className="w-full sm:min-w-[750px] max-w-xl max-h-[90vh] no-scrollbar mx-auto p-4 overflow-auto py-4 rtl dialog-width"
							>
								<DialogHeader>
									<DialogTitle className="flex justify-center items-end font-bold mt-3.5">
										جزئیات پیشنهاد
									</DialogTitle>
									<Formik
										initialValues={initialValues}
										validationSchema={validateSchema}
										onSubmit={(values) => {
											updateBid(values);
											// handleBid(
											// 	requestId,
											// 	Number(values.cost),
											// 	Number(values.area),
											// 	Number(values.power),
											// 	values.description,
											// 	values.installationTime,
											// 	1,
											// 	{
											// 		method: 1,
											// 		installmentPlan: {
											// 			numberOfMonths: 12,
											// 			downPaymentAmount: 2000,
											// 			monthlyAmount: 833,
											// 			notes: "Payment plan with 12 monthly installments after initial down payment",
											// 		},
											// 	}
											// );
										}}
									>
										{({ setFieldValue, values }) => (
											<Form className="w-full flex flex-col gap-6">
												<DialogHeader>
													<DialogTitle
														className={`flex vazir text-2xl`}
													>
														ثبت پیشنهاد
													</DialogTitle>
												</DialogHeader>
												<div className="flex flex-col gap-1">
													<span className="text-lg font-bold place-self-start">
														مشخصات درخواست
													</span>
													<div className={styles.Box}>
														<div className="flex">
															<DialogItem
																icon={Eclipse}
																fieldName="نام پنل"
																fieldValue={
																	panelName
																}
															/>
															<DialogItem
																icon={Building2}
																fieldName="نوع ساختمان"
																fieldValue={
																	buildingType
																}
															/>
														</div>
														<div className="flex">
															<DialogItem
																className="first:border-t-2"
																icon={Battery}
																fieldName="ظرفیت"
																fieldValue={
																	power
																}
																english={true}
																prefix="W"
															/>
															<DialogItem
																icon={
																	CalendarRange
																}
																fieldName="زمان پیشنهاد"
																fieldValue={DateConverter(
																	date
																)}
															/>
														</div>
														<DialogItem
															icon={MapPin}
															fieldName="آدرس"
															fieldValue={`استان ${address.province}، شهر ${address.city}`}
														/>
													</div>
												</div>
												<div className="w-full">
													<div className="flex flex-row justify-evenly gap-6">
														<CustomInput
															placeholder="قیمت پیشنهادی"
															name="cost"
															icon={DollarSign}
															type="number"
															autoFocus={true}
															containerClassName="w-1/2"
														/>
														<div className="w-full">
															<CustomDatePicker
																placeholder="زمان تخمینی نصب"
																date={
																	values.installationTime
																}
																setDate={(
																	date: string
																) => {
																	setFieldValue(
																		"installationTime",
																		date
																	);
																}}
															/>
														</div>
													</div>
													<div className="flex flex-row justify-evenly gap-6">
														<CustomInput
															placeholder="ظرفیت"
															name="power"
															icon={Battery}
															type="number"
															autoFocus={true}
															containerClassName="w-1/2"
														/>
														<CustomInput
															placeholder="مساحت"
															name="area"
															icon={LandPlot}
															type="number"
															containerClassName="w-1/2"
														/>
													</div>
													<CustomTextArea
														placeholder="جزئیات بیشتر"
														name="description"
														icon={MessageCircle}
														containerClassName="w-full"
													/>
												</div>

												<DialogFooter>
													<div className="flex w-full justify-between">
														<button
															onClick={() => {
																cancelBid();
															}}
															className="self-end w-32 flex place-content-center bg-gradient-to-br cursor-pointer from-[#EE4334] to-[#D73628] hover:from-[#D73628] hover:to-[#EE4334] active:from-[#EE4334] active:to-[#D73628] text-white py-2 px-4 rounded-md transition-all duration-300"
														>
															{deleteLoading ? (
																<LoadingOnButton />
															) : (
																<p>
																	لغو پیشنهاد
																</p>
															)}
														</button>
														<button
															type="submit"
															className="self-end w-32 flex place-content-center bg-gradient-to-br cursor-pointer from-[#34C759] to-[#00A92B] hover:from-[#2AAE4F] hover:to-[#008C25] active:from-[#008C25] active:to-[#2AAE4F] text-white py-2 px-4 rounded-md transition-all duration-300"
														>
															{loading ? (
																<LoadingOnButton />
															) : (
																<p>
																	ذخیره
																	تغییرات
																</p>
															)}
														</button>
													</div>
												</DialogFooter>
											</Form>
										)}
									</Formik>
								</DialogHeader>
								{/* <Item
									icon={Eclipse}
									fieldName="نام پنل"
									fieldValue={panelName}
								/>
								<Item
									icon={Battery}
									fieldName="ظرفیت"
									fieldValue={power}
									prefix="W"
									english={true}
								/>
								<Item
									icon={CalendarDays}
									fieldName="زمان تخمینی نصب"
									fieldValue={DateConverter(date)}
									english={true}
								/>
								<Item
									icon={DollarSign}
									fieldName="قیمت پیشنهادی شما"
									fieldValue={price}
									prefix="تومان"
								/>
								<Item
									icon={LandPlot}
									fieldName="مساحت"
									fieldValue={area}
									prefix="متر مربع"
								/>
								<Item
									icon={Building2}
									fieldName="نوع ساختمان"
									fieldValue={buildingType}
								/>
								<Item
									icon={MapPin}
									fieldName="آدرس"
									fieldValue={`استان ${address.province}، شهر ${address.city}`}
									smallValue={true}
								/>
								{description && (
									<Item
										icon={MessageCircle}
										fieldName="توضیحات"
										fieldValue={description}
										smallValue={true}
									/>
								)}
								<div className="flex w-full justify-between">
									<button
										onClick={() => {
											cancelBid();
										}}
										className="self-end w-32 flex place-content-center bg-gradient-to-br cursor-pointer from-[#EE4334] to-[#D73628] hover:from-[#D73628] hover:to-[#EE4334] active:from-[#EE4334] active:to-[#D73628] text-white py-2 px-4 rounded-md transition-all duration-300"
									>
										{deleteLoading ? (
											<LoadingOnButton />
										) : (
											<p>لغو پیشنهاد</p>
										)}
									</button>
									<button
										type="submit"
										className="self-end w-32 flex place-content-center bg-gradient-to-br cursor-pointer from-[#34C759] to-[#00A92B] hover:from-[#2AAE4F] hover:to-[#008C25] active:from-[#008C25] active:to-[#2AAE4F] text-white py-2 px-4 rounded-md transition-all duration-300"
									>
										{loading ? (
											<LoadingOnButton />
										) : (
											<p>ذخیره تغییرات</p>
										)}
									</button>
								</div> */}
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	);
}
