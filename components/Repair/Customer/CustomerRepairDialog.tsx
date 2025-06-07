"use client";
import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Siren, AlertCircle, Eclipse, Calendar } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import moment from "jalali-moment";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { baseURL, postData, putData } from "@/src/services/apiHub";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

interface ErrorResponse {
	message: string;
	status: number;
	error?: string;
	response: {
		data: {
			message: string;
			status: number;
			error?: string;
		};
	};
}

interface ContactInfo {
	type: string;
	value: string;
}

interface Address {
	id: number;
	province: string;
	provinceID: number;
	cityID: number;
	city: string;
	streetAddress: string;
	postalCode: string;
	houseNumber: string;
	unit: number;
}

interface RepairHistoryItem {
	id: number;
	createdAt: string;
	panel: {
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
		corporation: {
			id: number;
			name: string;
			logo: string;
			contactInfo: ContactInfo[];
			addresses: Address[];
		};
		address: Address;
		guarantee: {
			id: number;
			name: string;
			status: string;
			guaranteeType: string;
			durationMonths: number;
			description: string;
			terms: Record<string, unknown>;
		};
	};
	corporation: {
		id: number;
		name: string;
		logo: string;
		contactInfo: ContactInfo[];
		addresses: Address[];
	};
	subject: string;
	description: string;
	urgencyLevel: string;
	status: string;
	isGuaranteeRequested: boolean;
	record: {
		id: number;
		createdAt: string;
		title: string;
		details: string;
		date: string;
		isApproved: boolean;
		violation: {
			reason: string;
			details: string;
		};
	};
}

interface RepairDetailsDialogProps {
	isOpen: boolean;
	onClose: () => void;
	repairItem: RepairHistoryItem | null;
	onRefresh: () => void;
}

const validationSchema = Yup.object({
	problem: Yup.string()
		.required("لطفا مشکل را توضیح دهید")
		.min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
});
const RepairDetailsDialog = ({
	isOpen,
	onClose,
	repairItem,
	onRefresh,
}: RepairDetailsDialogProps) => {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);

	if (!repairItem) return null;

	const handleSubmit = async (values: { problem: string }) => {
		try {
			console.log(values);
			const repairHistoryId = repairItem.id;
			const response = await fetch(
				`http://46.249.99.69:8080/v1/user/report/maintenance/${repairHistoryId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({
						description: values.problem,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			// Handle success
			const data = await response.json();
			CustomToast(data?.message, "success");
			onRefresh();
			onClose();
		} catch (error: unknown) {
			const errMsg =
				generateErrorMessage(error as ErrorResponse) ||
				"هنگام ایجاد گزارش جدید مشکلی پیش آمد.";
			CustomToast(errMsg, "error");
		}
	};

	const handleOverrideRequest = async () => {
		putData({
			endPoint: `${baseURL}/v1/user/maintenance/request/${repairItem.id}/cancel`,
		}).then((res) => {
			CustomToast("درخواست نصب با موفقیت لغو شد!", "success");
			onRefresh();
			onClose();
		}).catch(err => {
			CustomToast("مشکلی در لغو درخواست پیش آمد!", "error");
		})
	}

	const handleFinalizeMaintenance = async () => {
		console.log(repairItem.id)
		putData({
			endPoint: `${baseURL}/v1/user/maintenance/request/${repairItem.id}/record/approve`,
		}).then(res => {
			toast.success("تعمیرات با موفقیت به پایان رسید");
			onRefresh();
			onClose();
		}).
		catch (error => {
			const errMsg = generateErrorMessage(error as ErrorResponse) || "هنگام نهایی کردن تعمیرات مشکلی پیش آمد.";
			toast.error(errMsg);
		})
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				style={{ backgroundColor: "#FEFEFE" }}
				className="min-w-[57vw] h-[80vh]"
			>
				<DialogHeader>
					<DialogTitle className="flex justify-center items-end font-bold mt-3.5">
						جزئیات تعمیرات
					</DialogTitle>
				</DialogHeader>

				<div className="overflow-y-auto max-h-[calc(80vh-100px)] pr-2">
					<div dir="rtl" className="flex flex-col gap-5">
						{/* Repair Info Section */}
						<div className="inset-neu-container !w-full !p-5 !bg-[#FEFEFE]">
							<h3 className="text-xl font-semibold text-navy-blue mb-4">
								{repairItem.subject}
							</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col">
									<div className="flex items-center gap-1">
										<Eclipse
											size={14}
											strokeWidth={2.5}
											className="text-fire-orange"
										/>
										<span className="text-sm text-gray-500">
											نام پنل
										</span>
									</div>
									<span className="text-lg font-medium">
										{repairItem.panel.name}
									</span>
								</div>
								<div className="flex flex-col">
									<div className="flex items-center gap-1">
										<Siren
											size={16}
											strokeWidth={2.5}
											className="text-fire-orange"
										/>
										<span className="text-sm text-gray-500">
											سطح اهمیت
										</span>
									</div>
									<span className="text-lg font-medium">
										{repairItem.urgencyLevel}
									</span>
								</div>
								<div className="flex flex-col">
									<div className="flex items-center gap-1">
										<Calendar
											size={14}
											strokeWidth={2.5}
											className="text-fire-orange"
										/>
										<span className="text-sm text-gray-500">
											تاریخ
										</span>
									</div>
									<span className="text-lg font-medium">
										{moment(
											repairItem.createdAt.slice(0, 10),
											"YYYY-MM-DD"
										)
											.locale("fa")
											.format("YYYY/MM/DD")}
									</span>
								</div>
								<div className="flex flex-col">
									<div className="flex items-center gap-1">
										<AlertCircle
											size={14}
											strokeWidth={2.5}
											className="text-fire-orange"
										/>
										<span className="text-sm text-gray-500">
											وضعیت
										</span>
									</div>
									<span className="text-lg font-medium">
										{repairItem.status}
									</span>
								</div>
							</div>
						</div>

						{/* Repair Notes */}
						<div className="inset-neu-container !w-full !p-5 !bg-[#FEFEFE]">
							<h4 className="text-lg font-semibold text-navy-blue mb-3">
								توضیحات تعمیر
							</h4>
							<p className="text-gray-700">
								{repairItem.description}
							</p>
						</div>

						{/* Problem Report Form */}
						<div className="w-full mt-5 border-t border-gray-300 pt-5">
							<h4 className="text-lg font-semibold text-navy-blue">
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
											className="self-end
												bg-gradient-to-br from-[#34C759] to-[#00A92B]
												hover:from-[#2AAE4F] hover:to-[#008C25]
												active:from-[#008C25] active:to-[#2AAE4F]
												text-white py-2 px-4 rounded-md transition-all duration-300"
										>
											ارسال گزارش
										</button>
									</Form>
								)}
							</Formik>
						</div>

						{/* Finalize Maintenance Section */}
						<div className="w-full mt-5 border-t border-gray-300 pt-5">
							<h4 className="text-lg font-semibold text-navy-blue mb-4">
								نهایی کردن تعمیرات
							</h4>
							<p className="text-gray-700 mb-4">
								در صورتی که تعمیرات پنل به پایان رسیده است، می‌توانید با کلیک روی دکمه زیر، تعمیرات را نهایی کنید.
							</p>
							<div className="w-full flex justify-end">
								<button
									onClick={handleFinalizeMaintenance}
									className="bg-gradient-to-br cursor-pointer from-[#34C759] to-[#00A92B]
										hover:from-[#2AAE4F] hover:to-[#008C25]
										active:from-[#008C25] active:to-[#2AAE4F]
										text-white py-2 px-4 rounded-md transition-all duration-300"
								>
									نهایی کردن تعمیرات
								</button>
							</div>
						</div>

						{/* Override Request */}
						<div className="w-full flex flex-col sm:flex-row gap-2 justify-between items-start mt-5 border-t border-gray-300 pt-5">
							<span>میتوانید از این بخش درخواست خود را حذف کنید.</span>
							<div className="flex gap-2">
								{!showConfirmation ? (
									<button 
										onClick={() => setShowConfirmation(true)}
										className="cursor-pointer
										bg-gradient-to-br from-[#ef3f3f] to-[#d00202]
										hover:from-[#e33333] hover:to-[#bd0000]
										active:from-[#bd0000] active:to-[#e33333]
										text-white py-2 px-4 rounded-md transition-all duration-300"
									>
										لغو درخواست
									</button>
								) : (
									<>
										<button
											onClick={() =>
												setShowConfirmation(false)
											}
											className="cursor-pointer
											bg-gradient-to-br from-gray-400 to-gray-500
											hover:from-gray-500 hover:to-gray-600
											active:from-gray-600 active:to-gray-500
											text-white py-2 px-4 rounded-md transition-all duration-300"
										>
											انصراف
										</button>
										<button
											onClick={() => {
												handleOverrideRequest();
												setShowConfirmation(false);
											}}
											className="cursor-pointer
											bg-gradient-to-br from-[#ef3f3f] to-[#d00202]
											hover:from-[#e33333] hover:to-[#bd0000]
											active:from-[#bd0000] active:to-[#e33333]
											text-white py-2 px-4 rounded-md transition-all duration-300">
											از لغو درخواست خود مطمئنم
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default RepairDetailsDialog;
