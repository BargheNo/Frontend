"use client";
import React, { useState } from "react";
import styles from "./PanelCard.module.css";
import {
	MoveLeft,
	Sun,
	Battery,
	TrendingUp,
	MapPin,
	AlertCircle,
	X,
	Plus,
	ChevronDown,
} from "lucide-react";
import { PanelCardProps } from "@/src/types/PanelCardTypes";
import Link from "next/link";
import IconWithBackground from "@/components/IconWithBackground/IconWithBackground";
import PanelIconWithBackground from "./PanelIconWithBackground";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { postData } from "@/src/services/apiHub";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import wordExpression from "@/src/functions/Calculations";
import StickyFooter from "@/components/Dialog/StickyFooter/StickyFooter";
import { Button } from "@/components/ui/button";
import CancelButton from "@/components/Dialog/CancelButton/CancelButton";

const PanelCard = ({
	id,
	panelName,
	technicalDetails,
	address,
	className,
	status,
}: PanelCardProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const MAXLENGTH: number = 135;
	const truncateText = (text: string, maxLength: number = MAXLENGTH) => {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + "...";
	};

	const handleSubmit = async (values: { problem: string }) => {
		setLoading(true);
		const formData = {
			description: values.problem,
		};
		postData({
			endPoint: `v1/user/report/panel/${id}`,
			data: formData,
		})
			.then((data) => {
				CustomToast(data?.message, "success");
				setOpen(false);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	const validationSchema = Yup.object({
		problem: Yup.string().required("وارد کردن توضیحات ضروری است"),
	});

	const getStatusColor = () => {
		if (status === "فعال")
			return "bg-gradient-to-br from-green-400 to-green-500 border-1 border-gray-100/50 shadow-sm shadow-green-500";
		if (status === "در حال نصب")
			return "bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-yellow-500";
		if (status === "غیر فعال")
			return "bg-gradient-to-br from-red-400 to-red-500 shadow-red-500";
		return "bg-gradient-to-br from-gray-400 to-gray-500 shadow-gray-500";
	};

	// const formatNumber = (num: number): string =>
	// 	num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	return (
		<>
			{/* === PANEL CARD === */}
			<div
				className={`${className} w-full border-t-1 border-gray-300 first:border-t-0`}
			>
				<div className="flex flex-col w-full h-full bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] p-3 sm:p-5 overflow-hidden relative">
					{/* PANEL NAME */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-800">
							{panelName}
						</h2>
					</div>

					{/* MAIN CONTENT DIV */}
					<div className="flex flex-col-reverse sm:flex-row-reverse justify-between w-full mb-6 gap-4">
						{/* LEFT SIDE - BUTTONS */}
						<div className="flex flex-row sm:flex-col gap-3 w-full sm:w-[20%]">
							<Dialog open={open} onOpenChange={setOpen}>
								<DialogTrigger asChild>
									<button className="w-full flex items-center justify-evenly bg-gradient-to-r from-[#EE4334] to-[#D73628] px-4 py-2 text-white cursor-pointer shadow-md rounded-full hover:shadow-lg transition duration-300 hover:scale-105">
										<span className="font-medium">
											گزارش مشکل
										</span>
										<AlertCircle className="mr-2 w-4 h-4" />
									</button>
								</DialogTrigger>
								<DialogContent
									style={{ backgroundColor: "#F1F4FC" }}
									className="max-h-[80vh] overflow-y-auto no-scrollbar rtl vazir pb-0 dialog-width flex flex-col"
									// className="w-full dialog-width max-h-[80vh] overflow-y-auto rtl"
								>
									<Formik
										initialValues={{ problem: "" }}
										validationSchema={validationSchema}
										onSubmit={handleSubmit}
									>
										{({ isSubmitting }) => (
											<Form>
												<div className="overflow-y-auto relative flex-1 no-scrollbar pb-4">
													<DialogHeader>
														<DialogTitle className="flex justify-center items-end font-bold mt-3.5">
															گزارش مشکل
														</DialogTitle>
													</DialogHeader>
													<CustomTextArea
														name="problem"
														icon={AlertCircle}
														textareaClassName="!bg-[#FEFEFE] h-32"
													>
														توضیحات مشکل
													</CustomTextArea>
												</div>
												<StickyFooter>
													<CancelButton />
													<Button
														type="submit"
														disabled={isSubmitting}
														className="min-w-28 flex place-content-center bg-gradient-to-br cursor-pointer from-[#34C759] to-[#00A92B] hover:from-[#2AAE4F] hover:to-[#008C25] active:from-[#008C25] active:to-[#2AAE4F] text-white px-4 rounded-md transition-all duration-300"
													>
														{loading ? (
															<LoadingOnButton />
														) : (
															<p>ارسال گزارش</p>
														)}
													</Button>
												</StickyFooter>
											</Form>
										)}
									</Formik>
								</DialogContent>
							</Dialog>
							<Link href={`my-panels/123`} className="w-full">
								<button className="w-full flex items-center justify-evenly bg-gradient-to-r from-[#EE4334] to-[#D73628] px-4 py-2 text-white cursor-pointer shadow-md rounded-full hover:shadow-lg transition duration-300 hover:scale-105">
									<span className="font-medium">
										مدیریت پنل
									</span>
									<MoveLeft className="mr-2 w-4 h-4" />
								</button>
							</Link>
						</div>

						{/* RIGHT SIDE - STATS */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full sm:w-[70%]">
							<div className="w-full rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
								<div className="flex items-center">
									<PanelIconWithBackground
										icon={Battery}
										className="w-full justify-between"
										text={"ظرفیت"}
										color="#6B7280"
									/>
								</div>
								<div className="flex flex-col m-2 sm:m-3 items-center justify-center">
									<div className="flex flex-row-reverse items-center">
										<span className="text-xl sm:text-3xl font-bold">
											{
												wordExpression(
													technicalDetails?.capacity,
													true
												).value
											}
										</span>
										<span className="text-xl sm:text-3xl font-bold">
											W
										</span>
									</div>
								</div>
							</div>

							<div className="w-full rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
								<div className="flex items-center">
									<PanelIconWithBackground
										icon={Sun}
										className="w-full justify-between"
										text={"تولید امروز"}
										color="#F59E0B"
									/>
								</div>
								<div className="flex flex-col m-2 sm:m-3 items-center justify-center">
									<div className="flex flex-row-reverse items-center">
										<span className="text-xl sm:text-3xl font-bold">
											{
												wordExpression(
													technicalDetails?.todayProduction,
													true
												).value
											}
										</span>
										<span className="text-xl sm:text-3xl font-bold">
											Wh
										</span>
									</div>
								</div>
							</div>

							<div className="w-full rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
								<div className="flex items-center">
									<PanelIconWithBackground
										icon={TrendingUp}
										className="w-full justify-between"
										text={"بازدهی"}
										color="#3B82F6"
									/>
								</div>
								<div className="flex flex-col m-2 sm:m-3 items-center justify-center">
									<div className="flex flex-row-reverse items-center">
										<span className="text-xl sm:text-3xl font-bold">
											{technicalDetails.efficiency}
										</span>
										<span className="text-xl sm:text-3xl font-bold">
											%
										</span>
									</div>
								</div>
							</div>

							<div className="w-full rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
								<div className="flex items-center">
									<PanelIconWithBackground
										icon={AlertCircle}
										className="w-full justify-between"
										text={"وضعیت پنل"}
										color="#6B7280"
									/>
								</div>
								<div className="flex flex-col m-2 sm:m-3 items-center justify-center">
									<div className="flex flex-row-reverse items-center place-items-center gap-1">
										<div
											className={`h-4 w-4 rounded-full ${getStatusColor()} shadow-md`}
										/>
										<span className="text-sm font-medium text-gray-600">
											{status}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* ADDRESS SECTION */}
					<div className="flex items-start text-sm text-gray-700 mt-6">
						<div className="flex flex-row items-center">
							<IconWithBackground icon={MapPin} color="#6B7280" />
							<div className="font-medium mx-2">آدرس:</div>
						</div>
						<div className="flex flex-row mt-[6px]">
							<span className="mr-1">
								{isExpanded ? address : truncateText(address)}
								{address.length > MAXLENGTH && (
									<button
										onClick={() =>
											setIsExpanded(!isExpanded)
										}
										className="text-blue-500 hover:text-blue-700 mr-2"
									>
										{isExpanded ? "کمتر" : "بیشتر"}
									</button>
								)}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
				<h4 className="text-lg font-semibold text-navy-blue mb-4">
					گزارش مشکل
				</h4>
				<Formik
					initialValues={{ problem: "" }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form className="flex flex-col space-y-4">
							<CustomTextArea
								name="problem"
								icon={AlertCircle}
								textareaClassName="!bg-[#FEFEFE] h-32"
							>
								توضیحات مشکل
							</CustomTextArea>
							<button
								type="submit"
								disabled={isSubmitting}
								className="self-end bg-gradient-to-br from-[#34C759] to-[#00A92B] hover:from-[#2AAE4F] hover:to-[#008C25] active:from-[#008C25] active:to-[#2AAE4F] text-white py-2 px-4 rounded-md transition-all duration-300"
							>
								ارسال گزارش
							</button>
						</Form>
					)}
				</Formik>
			</Modal> */}
		</>
	);
};

export default PanelCard;
