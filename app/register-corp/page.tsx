"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import * as Yup from "yup";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CorpInfoForm from "@/components/Auth/RegisterCorp/CorpInfoForm/CorpInfoForm";
import AddressesForm from "@/components/Auth/RegisterCorp/AddressesForm/AddressesForm";
import { useSelector } from "react-redux";
import { setCorp } from "@/src/store/slices/corpSlice";
import { useDispatch } from "react-redux";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Building2, FileText, MapPin, Phone } from "lucide-react";
import ContactInfoForm from "@/components/Auth/RegisterCorp/ContactInfoForm/ContactInfoForm";
import CertificatesForm from "@/components/Auth/RegisterCorp/CertificatesForm/CertificatesForm";
import { baseURL, getData, postData, putData } from "@/src/services/apiHub";
import { toast } from "sonner";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { setUser } from "@/src/store/slices/userSlice";

const steps = ["اطلاعات شرکت", "اطلاعات تماس", "آدرس", "مدارک"];
const icons = [
	<Building2 className="w-5" key="اطلاعات شرکت" />,
	<Phone className="w-5" key="اطلاعات تمایس" />,
	<MapPin className="w-5" key="آدرس" />,
	<FileText className="w-5" key="مدارک" />,
];
const initialValuesForm = {
	name: "",
	registrationNumber: "",
	nationalID: "",
	iban: "",
	signatories: [],
	addresses: [],
	contactInformation: [],
};

const validationSchemaForm = Yup.object({
	name: Yup.string().required("نام شرکت الزامی است"),
	registrationNumber: Yup.string().required("شماره ثبت الزامی است"),
	nationalID: Yup.string().required("شناسه ملی الزامی است"),
	iban: Yup.string().required("شماره شبا الزامی است"),
	signatories: Yup.array().of(
		Yup.object().shape({
			name: Yup.string().required("نام صاحب امضا الزامی است"),
			nationalCardNumber: Yup.string()
				// nationalID: Yup.string()
				.required("کد ملی صاحب امضا الزامی است")
				.length(10, "کد ملی باید 10 رقم باشد"),
			position: Yup.string().required("موقعیت صاحب امضا الزامی است"),
		})
	),
	addresses: Yup.array().of(
		Yup.object().shape({
			provinceID: Yup.number().required("این فیلد الزامی است"),
			cityID: Yup.number().required("این فیلد الزامی است"),
			streetAddress: Yup.string().required("این فیلد الزامی است"),
			postalCode: Yup.string()
				.required("کد پستی الزامی است")
				.length(10, "کد پستی باید 10 رقم باشد"),
			houseNumber: Yup.string().optional(),
			unit: Yup.number().optional(),
		})
	),
	contactInformation: Yup.array().of(
		Yup.object().shape({
			contactTypeID: Yup.number()
				.moreThan(0, "نوع اطلاعات تماس غیرقابل قبول است")
				.lessThan(9, "نوع اطلاعات تماس غیرقابل قبول است")
				.required("این مورد الزامی است"),
			contactValue: Yup.string().required("این مورد الزامی است"),
		})
	),
});

export default function Page() {
	// const [corpId, setCorpId] = useState(0);
	const dispatch = useDispatch();
	const router = useRouter();
	const [step, setStep] = useState<number>(0);
	const corp = useSelector((state: RootState) => state).corp;
	const user = useSelector((state: RootState) => state).user;
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const corpId = useSelector((state: RootState) => state.user.corpId);
	const onSubmit = async (values: corpData, setFieldValue: any) => {
		// await handleFormSubmit(values);
		if (step === 0) {
			if (corpId) {
				getData({
					endPoint: `${baseURL}/v1/user/corps/registration/${corpId}`,
				}).then((res) => {
					const formData: corpData = {};
					if (values.name != res.data.name) {
						formData["name"] = values.name;
					}
					if (
						values.registrationNumber != res.data.registrationNumber
					) {
						formData["registrationNumber"] = String(
							values.registrationNumber
						);
					}
					if (values.nationalID != res.data.nationalID) {
						formData["nationalID"] = String(values.nationalID);
					}
					if (values.iban != res.data.iban) {
						formData["iban"] = String(values.iban);
					}
					const newSig = res.data.signatories
						? res.data.signatories
						: [];
					if (
						values.signatories?.length !== newSig.length ||
						JSON.stringify(values.signatories) !==
							JSON.stringify(res.data.signatories)
					) {
						console.log("new signatory", values.signatories);
						console.log(res.data.signatories);
						formData["signatories"] = values.signatories;
					}
					// formData["signatories"]?.map((signatory) => {
					// 	if (
					// 		signatory.name === "" ||
					// 		signatory.nationalCardNumber === ""
					// 	) {
					// 		toast(
					// 			"اطلاعات مورد نیاز صاحبان امضا را کامل وارد کنید"
					// 		);
					// 		return;
					// 	}
					// });
					console.log("formData in step 0", formData);
					if (Object.keys(formData).length !== 0) {
						putData({
							endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/basic`,
							data: formData,
							// data: {
							// 	name: values.name,
							// 	registrationNumber: String(
							// 		values.registrationNumber
							// 	),
							// 	nationalID: String(values.nationalID),
							// 	iban: String(values.iban),
							// 	// signatories: values.signatories,
							// },
						})
							.then((res) => {
								toast(res.message);
								// toast(generateErrorMessage(res));
								if (step < steps.length - 1) {
									setStep(step + 1);
								}
							})
							.catch((err) => {
								toast(generateErrorMessage(err));
							});
					} else if (step < steps.length - 1) {
						setStep(step + 1);
					}
				});
			} else {
				console.log("post", values);
				// getData({ endPoint: `${baseURL}/v1/contact/types` }).then((res) =>
				// 	console.log(res)
				// );
				postData({
					endPoint: `${baseURL}/v1/user/corps/registration/basic`,
					data: {
						name: values.name,
						registrationNumber: String(values.registrationNumber),
						nationalID: String(values.nationalID),
						iban: String(values.iban),
						signatories: values.signatories,
					},
				})
					.then((res) => {
						console.log(res);
						// setCorpId(res.data.id);
						dispatch(
							setUser({
								...user,
								corpId: res.data.id,
							})
						);
						toast(res.message);
						if (step < steps.length - 1) {
							setStep(step + 1);
						}
					})
					.catch((err) => {
						toast(generateErrorMessage(err));
					});
			}
		} else if (step === 1) {
			if (corpId) {
				let error = false;
				getData({
					endPoint: `${baseURL}/v1/user/corps/registration/${corpId}`,
				}).then((res) => {
					const formData: corpData = {};
					if (values.contactInformation != res.data.contactInfo) {
						formData["contactInformation"] =
							values.contactInformation;
					}
					console.log("formData in step 1", formData);

					formData["contactInformation"]?.forEach((contact) => {
						console.log(contact.contactValue);
						if (!contact.contactValue) {
							toast("مقدار راه ارتباطی را وارد کنید");
							error = true;
							return;
						}
					});
					if (!error) {
						postData({
							endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts`,
							data: formData,
						})
							.then((res) => {
								console.log(res);
								toast(res?.message);
								setFieldValue("contactInformation", [])
								if (step < steps.length - 1) {
									setStep(step + 1);
								}
							})
							.catch((err) => {
								toast(generateErrorMessage(err));
							});
					}
				});
			} else {
				toast("شرکتی برای شما ثبت نشده است.");
			}
		} else if (step === 2) {
			if (corpId) {
				getData({
					endPoint: `${baseURL}/v1/user/corps/registration/${corpId}`,
				}).then((res) => {
					const formData: corpData = {};
					if (values.addresses != res.data.addresses) {
						formData["addresses"] = values.addresses;
					}
					console.log("formData in step 2", formData);
					postData({
						endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/address`,
						data: formData,
						// data: {
						// 	contactInformation: values.contactInformation
						// },
					})
						.then((res) => {
							console.log(res);
							// setCorpId(res.data.id);
							// dispatch(
							// 	setUser({
							// 		...user,
							// 		corpId: res.data.id,
							// 	})
							// );
							toast(res?.message);
							if (step < steps.length - 1) {
								setStep(step + 1);
							}
						})
						.catch((err) => {
							toast(generateErrorMessage(err));
						});
				});
			} else {
				toast("شرکتی برای شما ثبت نشده است.");
			}
		}
		// dispatch(
		// 	setCorp({
		// 		...corp,
		// 		name: values.name,
		// 		registrationNumber: values.registrationNumber,
		// 		nationalID: values.nationalID,
		// 		iban: values.iban,
		// 		signatories: values.signatories,
		// 		addresses: values.addresses,
		// 	})
		// );
	};
	useEffect(() => {
		if (!accessToken) {
			router.push("/login");
		}
	}, [accessToken, router]);
	const handleBack = (values: corpData) => {
		// dispatch(
		// 	setCorp({
		// 		...corp,
		// 		name: values.name,
		// 		registrationNumber: values.registrationNumber,
		// 		nationalID: values.nationalID,
		// 		iban: values.iban,
		// 		signatories: values.signatories,
		// 		addresses: values.addresses,
		// 	})
		// );
		if (step > 0) {
			setStep(step - 1);
		}
	};

	return (
		<div className="w-screen min-h-screen h-fit place-items-center flex place-content-center items-center bg-[#F0EDEF]">
			<div className="space-y-4 rtl vazir m-auto h-2/3 w-1/2 my-20">
				<div className="flex items-center justify-center">
					{Array.from({ length: steps.length }).map((_, index) => (
						<div key={index} className="flex items-center">
							<Badge
								className={cn(
									"rounded-full w-42 transition-all duration-300 ease-in-out text-md neu-shadow gap-2 p-2 bg-gradient-to-r ",
									index <= step
										? "from-[#A55FDA] to-[#F37240] text-black/80"
										: "from-[#A55FDA]/30 to-[#F37240]/30 text-black",
									index < step &&
										"from-[#A55FDA] to-[#F37240] text-white"
								)}
								key={index}
							>
								{steps[index]}
								<div className="">{icons[index]}</div>
							</Badge>
							{index < steps.length - 1 && (
								<div
									className={cn(
										"w-8 h-0.5 transition-all duration-500 ease-in-out",
										index < step
											? "bg-primary"
											: "bg-primary/30"
									)}
								/>
							)}
						</div>
					))}
				</div>
				<Formik
					initialValues={initialValuesForm}
					validationSchema={validationSchemaForm}
					onSubmit={onSubmit}
				>
					{({ setFieldValue, values }) => (
						<Card className="justify-between neu-shadow border-0">
							<CardHeader>
								<CardTitle className="text-lg">
									لطفا اطلاعات شرکت خود را وارد کنید
								</CardTitle>
								<CardDescription>
									مرحله فعلی: {steps[step]}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div>
									{step === 0 && (
										<CorpInfoForm
											values={values}
											setFieldValue={setFieldValue}
										/>
									)}
									{step === 1 && (
										<ContactInfoForm
											values={values}
											setFieldValue={setFieldValue}
										/>
									)}
									{step === 2 && (
										<AddressesForm
											values={values}
											setFieldValue={setFieldValue}
										/>
									)}
									{step === 3 && (
										<CertificatesForm
											values={values}
											setFieldValue={setFieldValue}
										/>
									)}
								</div>
							</CardContent>
							<CardFooter className="flex justify-between align-bottom ltr">
								<button
									type="submit"
									className="hover:cursor-pointer cta-neu-button w-1/4"
									onClick={() =>
										onSubmit(values, setFieldValue)
									}
								>
									{step === steps.length - 1
										? "تایید"
										: "بعدی"}
								</button>
								{step > 0 && (
									<button
										type="button"
										className="hover:cursor-pointer cta-neu-button w-1/4"
										onClick={() => handleBack(values)}
									>
										قبلی
									</button>
								)}
							</CardFooter>
						</Card>
					)}
				</Formik>
			</div>
		</div>
	);
}
