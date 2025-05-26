"use client";
import React, { useState, useEffect } from "react";
import { Plus, NotebookPen, ChevronDown, Check, Tag } from "lucide-react";
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
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { toast } from "sonner";
import TransparentLoading from "@/components/LoadingSpinner/TransparentLoading";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import AddComponent from "@/components/AddComponent/AddComponent";

const urgencyOptions = [
	{ value: 1, label: "اولویت پایین" },
	{ value: 2, label: "اولویت متوسط" },
	{ value: 3, label: "اولویت بالا" },
];

interface FormValues {
	title: string;
	note: string;
}

const validationSchema = Yup.object({
	title: Yup.string()
		.required("لطفا عنوان را وارد کنید!")
		.min(3, "عنوان باید حداقل 3 کاراکتر باشد"),
	note: Yup.string()
		.required("لطفا جزئیات مشکل را وارد کنید!")
		.min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
});

interface Company {
	id: number;
	name: string;
	logo: string; // TODO: What is proper type for image??
	contactInfo: string[]; // TODO: fix the type
	adresses: string[]; // TODO: fix the type
}

interface Panel {
	id: number;
	panelName: string;
	Corporation: {
		id: number;
		name: string;
		logo: string; // TODO: Set the proper type for logo
		contactInfo: string[]; // TODO: Set the proper type
		addresses: string[]; // TODO: Set the proper type
	};
	power: number;
	area: number;
	buildingType: string;
	totalNumberOfModules: number;
	tilt: number;
	azimuth: number;
	address: {
		ID: number;
		province: string;
		city: string;
		streetAddress: string;
		postalCode: string;
		houseNumber: string;
		unit: number;
	};
}

const CustomerRepairRequest = () => {
	const [open, setOpen] = useState(false);
	const [isUrgencyOpen, setIsUrgencyOpen] = useState(false);
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [urgency, setUrgency] = useState(1);
	const [repairByManufacturer, setRepairByManufacturer] = useState(true);
	const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
	const [selectedPanel, setSelectedPanel] = useState<number | null>(null);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [panels, setPanels] = useState<Panel[]>([]);
	const [loadingPanels, setLoadingPanels] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);

	useEffect(() => {
		getCustomerMyPanels
			.GetCustomerMyPanels()
			.then((res) => {
				// console.log(res);
				// Debugging: Log the response data if needed
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

	// TODO: It is obviously the better practice to use corporation ID instead of name which is not handled by API.
	const handleCompanySelection = (companyID: number) => {
		setSelectedCompany(companyID);
		const panel = panels.find((p) => p.id === selectedPanel);
		if (panel && companyID !== panel.Corporation.id) {
			setRepairByManufacturer(false);
		}
	};

	const handlePanelSelection = (panelId: number) => {
		setSelectedPanel(panelId);
		const panel = panels.find((p) => p.id === panelId);
		if (panel) {
			setSelectedCompany(panel.Corporation.id);
			setRepairByManufacturer(true);
		}
	};

	const handleSubmit = async (values: FormValues) => {
		const formData = {
			panelID: selectedPanel,
			corporationID: repairByManufacturer
				? panels.find((p) => p.id === selectedPanel)?.Corporation.id
				: selectedCompany,
			subject: values.title,
			description: values.note,
			urgencyLevel: urgency,
		};

		console.log(formData);
		setButtonLoading(true);

		postRepairRequest
			.PostCustomerRepairRequest(formData)
			.then((res) => {
				console.log(res);
				CustomToast("درخواست تعمیر با موفقیت ثبت شد!", "success");
				// toast.success("درخواست تعمیر با موفقیت ثبت شد!");
				setButtonLoading(false);
			})
			.catch((res) => {
				CustomToast("مشکلی در ثبت درخواست پیش آمد!", "error");
				// toast.error("مشکلی در ثبت درخواست پیش آمد!");
				setButtonLoading(false);
			});

		// try {
		//   const response = await fetch('EndPointtttttttttttttttttttttt', {
		//     method: 'POST',
		//     headers: {
		//       'Content-Type': 'application/json',
		//       'Authorization': 'Tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn'
		//     },
		//     body: JSON.stringify(formData)
		//   });

		//   if (!response.ok) {
		//     throw new Error('Network response was not ok');
		//   }

		//   const data = await response.json();
		//   console.log('Success:', data);
		// } catch (error) {
		//   console.error('Error:', error);
		// }
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{/* <div className="flex flex-col items-center gap-4">
					<button
						className="cta-neu-button !w-fit !rounded-4xl"
						aria-label="درخواست تعمیرات فوری"
					>
						<Plus className="w-28 h-28" />
					</button>
					<span className="text-navy-blue">درخواست تعمیرات فوری</span>
				</div> */}
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
										name="province"
										onValueChange={(value) => {}}
									>
										<SelectTrigger
											className={`${styles.CustomInput} cursor-pointer rtl`}
											id="province"
											// style={{ width: "25vw" }}
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
														(panel, index) => (
															<SelectItem
																id={String(
																	index
																)}
																key={index}
																value={String(
																	panel.id
																)}
																className="cursor-pointer"
															>
																{
																	panel.panelName
																}
															</SelectItem>
														)
													)
												) : (
													<p>هیچ پنلی یافت نشد</p>
												)}
											</SelectGroup>
										</SelectContent>
									</Select>
									{/* Panel Selection */}
									{/* <div className="relative" dir="rtl">
										
										<label className="block text-sm font-medium text-gray-700 mt-8">
											انتخاب پنل
										</label>
										<button
											type="button"
											className="w-full px-4 py-3 flex justify-between items-center inset-neu-container !bg-[#FEFEFE] focus:outline-2"
											onClick={() =>
												setIsPanelOpen(!isPanelOpen)
											}
										>
											{selectedPanel
												? panels.find(
														(p) =>
															p.id ===
															selectedPanel
												  )?.panelName
												: "انتخاب پنل"}
											<ChevronDown
												className={`w-5 h-5 text-gray-400 transition-transform ${
													isPanelOpen
														? "transform rotate-180"
														: ""
												}`}
											/>
										</button>

										{isPanelOpen && (
											<div className="absolute z-10 mt-1 w-[99%] neu-shadow rounded-2xl !bg-[#FEFEFE] py-1 text-base ring-2 ring-gray-300 ring-opacity-5 focus:outline-2">
												{panels.map((panel) => (
													<div
														key={panel.id}
														className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
														onClick={() => {
															handlePanelSelection(
																panel.id
															);
															setIsPanelOpen(
																false
															);
														}}
													>
														<span>
															{panel.panelName}
														</span>
														{selectedPanel ===
															panel.id && (
															<Check className="w-5 h-5 text-blue-500" />
														)}
													</div>
												))}
											</div>
										)}
									</div> */}

									{/* Title */}
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

									{/* Note */}
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
										name="province"
										onValueChange={(value) => {}}
									>
										<SelectTrigger
											className={`${styles.CustomInput} cursor-pointer rtl mt-4`}
											id="province"
											// style={{ width: "25vw" }}
										>
											<SelectValue placeholder="سطح اهمیت" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>
													سطح اهمیت
												</SelectLabel>
												{urgencyOptions?.length > 0 ? (
													urgencyOptions.map(
														(option, index) => (
															<SelectItem
																id={String(
																	index
																)}
																key={
																	option.value
																}
																value={String(
																	option.value
																)}
																className="cursor-pointer"
															>
																{option.label}
															</SelectItem>
														)
													)
												) : (
													<p>هیچ سطحی یافت نشد</p>
												)}
											</SelectGroup>
										</SelectContent>
									</Select>
									{/* Urgency Level */}
									{/* <div className="relative mt-10" dir="rtl">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											سطح اهمیت
										</label>
										<button
											type="button"
											className="w-full px-4 py-3 flex justify-between items-center inset-neu-container !bg-[#FEFEFE] focus:outline-2"
											onClick={() =>
												setIsUrgencyOpen(!isUrgencyOpen)
											}
										>
											{
												urgencyOptions.find(
													(opt) =>
														opt.value === urgency
												)?.label
											}
											<ChevronDown
												className={`w-5 h-5 text-gray-400 transition-transform ${
													isUrgencyOpen
														? "transform rotate-180"
														: ""
												}`}
											/>
										</button>

										{isUrgencyOpen && (
											<div className="absolute z-10 mt-1 w-[99%] neu-shadow rounded-2xl !bg-[#FEFEFE] py-1 text-base ring-2 ring-gray-300 ring-opacity-5 focus:outline-2">
												{urgencyOptions.map(
													(option) => (
														<div
															key={option.value}
															className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
															onClick={() => {
																setUrgency(
																	option.value
																);
																setIsUrgencyOpen(
																	false
																);
															}}
														>
															<span>
																{option.label}
															</span>
															{urgency ===
																option.value && (
																<Check className="w-5 h-5 text-blue-500" />
															)}
														</div>
													)
												)}
											</div>
										)}
									</div> */}

									{/* Company Selection */}
									<div
										className="space-y-2 mt-10 mb-10"
										dir="rtl"
									>
										<div className="flex items-center">
											<input
												type="checkbox"
												id="repairByManufacturer"
												checked={repairByManufacturer}
												onChange={() => {
													setRepairByManufacturer(
														!repairByManufacturer
													);
													if (!repairByManufacturer) {
														const panel =
															panels.find(
																(p) =>
																	p.id ===
																	selectedPanel
															);
														if (panel) {
															setSelectedCompany(
																panel
																	.Corporation
																	.id
															);
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
																checked={
																	selectedCompany ===
																	company.id
																}
																onChange={() =>
																	handleCompanySelection(
																		company.id
																	)
																} // TODO: Change it to use ID
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

									{/* Submit Button */}
									<div className="flex justify-end">
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
