"use client";
import React, { useState, useEffect } from "react";
import { NotebookPen, Tag } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import styles from "./CustomRepairRequest.module.css";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import { Formik } from "formik";
import CompaniesService from "@/src/services/getCompaniesService";
import getCustomerMyPanels from "@/src/services/getCustomerMyPanels";
import postRepairRequest from "@/src/services/postRepairRequest";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import TransparentLoading from "@/components/Loading/LoadingSpinner/TransparentLoading";
import getUrgencyLevels from "@/src/services/getUrgencyLevelsService";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import AddComponent from "@/components/AddComponent/AddComponent";

interface UrgencyLevel {
	id: number;
	name: string;
}

interface FormValues {
	title: string;
	note: string;
}

interface Company {
	id: number;
	name: string;
	logo: string;
	contactInfo: string[];
	adresses: string[];
}

interface Panel {
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
		contactInfo: string[];
		addresses: string[];
	};
	address: {
		id: number;
		province: string;
		provinceID: number;
		cityID: number;
		city: string;
		streetAddress: string;
		postalCode: string;
		houseNumber: string;
		unit: number;
	};
}

interface CustomerRepairRequestProps {
	onRefresh?: () => void;
}

const validationSchema = Yup.object({
	title: Yup.string()
		.required("لطفا عنوان را وارد کنید!")
		.min(3, "عنوان باید حداقل 3 کاراکتر باشد"),
	note: Yup.string()
		.required("لطفا جزئیات مشکل را وارد کنید!")
		.min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
});

const CustomerRepairRequest = ({ onRefresh }: CustomerRepairRequestProps) => {
	const [open, setOpen] = useState(false);
	const [urgency, setUrgency] = useState(1);
	const [repairByManufacturer, setRepairByManufacturer] = useState(true);
	const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
	const [selectedPanel, setSelectedPanel] = useState<number | null>(null);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [panels, setPanels] = useState<Panel[]>([]);
	const [loadingPanels, setLoadingPanels] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [isUsingGuarantee, setIsUsingGuarantee] = useState(false);
	const [urgencyLevels, setUrgencyLevels] = useState<UrgencyLevel[]>([]);
	const [loadingUrgencyLevels, setLoadingUrgencyLevels] = useState(true);

	useEffect(() => {
		getCustomerMyPanels
			.GetCustomerMyPanels()
			.then((res) => {
				setPanels(res.data);
				setLoadingPanels(false);
			})
			.catch((err) => {
				console.error("Error fetching panels", err);
				setLoadingPanels(false);
			});
	}, []);

	useEffect(() => {
		CompaniesService.GetCompanies()
			.then((res) => {
				setCompanies(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching companies:", err);
				setIsLoading(false);
			});
	}, []);

	useEffect(() => {
		getUrgencyLevels.GetUrgencyLevels()
			.then((res) => {
				setUrgencyLevels(res.data);
				setLoadingUrgencyLevels(false);
			})
			.catch((err) => {
				console.error("Error fetching urgency levels:", err);
				setLoadingUrgencyLevels(false);
			});
	}, []);

	const handleCompanySelection = (companyID: number) => {
		setSelectedCompany(companyID);
		const panel = panels.find((p) => p.id === selectedPanel);
		if (panel && companyID !== panel.corporation.id) {
			setRepairByManufacturer(false);
		}
	};

	const handleSubmit = async (values: FormValues) => {
		const formData = {
			panelID: selectedPanel,
			corporationID: repairByManufacturer
				? panels.find(p => p.id === selectedPanel)?.corporation.id
				: selectedCompany,
			subject: values.title,
			description: values.note,
			urgencyLevel: urgency,
			isUsingGuarantee: isUsingGuarantee
		};

		setButtonLoading(true);
		console.log(formData);

		postRepairRequest
			.PostCustomerRepairRequest(formData)
			.then(() => {
				CustomToast("درخواست تعمیر با موفقیت ثبت شد!", "success");
				setButtonLoading(false);
				onRefresh?.();
				setOpen(false);
			})
			.catch(() => {
				CustomToast("مشکلی در ثبت درخواست پیش آمد!", "error");
				setButtonLoading(false);
			});
	};

	const canUseGuarantee = () => {
		if (!repairByManufacturer || !selectedPanel) return false;
		const selectedPanelData = panels.find(p => p.id === selectedPanel);
		return selectedPanelData?.guaranteeStatus === "فعال";
	};

	useEffect(() => {
		if (!canUseGuarantee()) {
			setIsUsingGuarantee(false);
		}
	}, [repairByManufacturer, selectedPanel, panels]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<AddComponent title="درخواست تعمیرات فوری" />
			</DialogTrigger>
			<DialogContent
				style={{ backgroundColor: "#F1F4FC" }}
				className="w-full sm:min-w-[950px] max-w-xl mx-auto p-6 overflow-auto max-h-[90vh] overflow-y-auto"
			>
				<DialogHeader>
					<DialogTitle className="flex justify-center items-end font-bold mt-3.5 cursor-pointer">
						ثبت درخواست تعمیر
					</DialogTitle>
				</DialogHeader>

				<div className="overflow-y-auto max-h-[calc(80vh-100px)] no-scrollbar">
					<div dir="rtl" className="flex flex-col">
						<Formik
							initialValues={{
								title: "",
								note: "",
							}}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{(formik) => (
								<form
									onSubmit={formik.handleSubmit}
									className="space-y-0"
								>
									<Select
										name="panel"
										onValueChange={(value) => setSelectedPanel(Number(value))}
									>
										<SelectTrigger
											className={`${styles.CustomInput} cursor-pointer rtl`}
											id="panel"
										>
											<SelectValue placeholder="انتخاب پنل" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>
													انتخاب پنل
												</SelectLabel>
												{panels?.length > 0 ? (
													panels.map(
														(panel) => (
															<SelectItem
																key={panel.id}
																value={String(panel.id)}
																className="cursor-pointer"
															>
																{panel.name}
															</SelectItem>
														)
													)
												) : (
													<p>هیچ پنلی یافت نشد</p>
												)}
											</SelectGroup>
										</SelectContent>
									</Select>

									<div className="flex flex-col md:flex-row ">
										<div className="flex-1">
											<CustomInput
												name="title"
												icon={Tag}
												type="text"
												inputClassName="!bg-[#FEFEFE]"
											>
												عنوان
											</CustomInput>
										</div>
									</div>

									<div>
										<CustomTextArea
											name="note"
											icon={NotebookPen}
											textareaClassName="!bg-[#FEFEFE]"
										>
											شرح مشکل
										</CustomTextArea>
									</div>

									<Select
										name="urgency"
										onValueChange={(value) => setUrgency(Number(value))}
									>
										<SelectTrigger
											className={`${styles.CustomInput} cursor-pointer rtl mt-4`}
											id="urgency"
										>
											<SelectValue placeholder="سطح اهمیت" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>
													سطح اهمیت
												</SelectLabel>
												{loadingUrgencyLevels ? (
													<LoadingSpinner />
												) : urgencyLevels?.length > 0 ? (
													urgencyLevels.map((level) => (
														<SelectItem
															key={level.id}
															value={String(level.id)}
															className="cursor-pointer"
														>
															{level.name}
														</SelectItem>
													))
												) : (
													<p>هیچ سطحی یافت نشد</p>
												)}
											</SelectGroup>
										</SelectContent>
									</Select>

									<div className="space-y-2 mt-10 mb-10" dir="rtl">
										<div className="flex items-center">
											<input
												type="checkbox"
												id="repairByManufacturer"
												checked={repairByManufacturer}
												onChange={() => {
													setRepairByManufacturer(!repairByManufacturer);
													if (!repairByManufacturer) {
														const panel = panels.find(
															(p) => p.id === selectedPanel
														);
														if (panel) {
															setSelectedCompany(panel.corporation.id);
														}
													}
												}}
												className="h-4 w-4 text-blue-600 cursor-pointer focus:ring-blue-500 border-gray-300 rounded"
											/>
											<label
												htmlFor="repairByManufacturer"
												className="mr-2 block text-sm text-gray-700"
											>
												مایلم درخواست تعمیر برای شرکت
												تامین کنندۀ پنل ارسال شود.
											</label>
										</div>

										{!repairByManufacturer && (
											<div className="ml-6 space-y-2 h-28 p-5 inset-neu-container no-scrollbar overflow-y-scroll w-full !bg-[#FEFEFE]">
												{isLoading || loadingPanels ? (
													<LoadingSpinner />
												) : (
													companies.map((company) => (
														<div
															key={company.id}
															className="flex items-center"
														>
															<input
																type="radio"
																id={`company-${company.id}`}
																name="company-selection"
																checked={selectedCompany === company.id}
																onChange={() => handleCompanySelection(company.id)}
																className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
															/>
															<label
																htmlFor={`company-${company.id}`}
																className="mr-2 block text-sm text-gray-700"
															>
																{company.name}
															</label>
														</div>
													))
												)}
											</div>
										)}
									</div>

									<div className="space-y-2 mt-10 mb-10" dir="rtl">
										<div className="flex items-center">
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<div className="flex items-center">
															<input
																type="checkbox"
																id="isUsingGuarantee"
																checked={isUsingGuarantee}
																onChange={() => setIsUsingGuarantee(!isUsingGuarantee)}
																disabled={!canUseGuarantee()}
																className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
																	!canUseGuarantee() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
																}`}
															/>
															<label 
																htmlFor="isUsingGuarantee" 
																className={`mr-2 block text-sm ${
																	!canUseGuarantee() ? 'text-gray-400' : 'text-gray-700'
																}`}
															>
																مایلم از گارانتی استفاده کنم
															</label>
														</div>
													</TooltipTrigger>
													{!canUseGuarantee() && (
														<TooltipContent className="max-w-[300px] text-right">
															<p>برای استفاده از گارانتی، تعمیرات باید توسط شرکتی انجام شود که پنل را نصب کرده است، همچنین امکان گارانتی باید برای این پنل فعال باشد.</p>
														</TooltipContent>
													)}
												</Tooltip>
											</TooltipProvider>
										</div>
									</div>

									<div className='flex justify-end'>
										<button
											type="submit"
											className="bg-gradient-to-br from-[#34C759] to-[#00A92B]
														hover:from-[#2AAE4F] hover:to-[#008C25]
														active:from-[#008C25] active:to-[#2AAE4F]
														text-white py-2 px-4 rounded-md transition-all duration-300 cursor-pointer"
										>
											{buttonLoading && (
												<TransparentLoading />
											)}
											ثبت درخواست تعمیر
										</button>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CustomerRepairRequest;
