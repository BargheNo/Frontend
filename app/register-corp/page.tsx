"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CorpInfoForm from "@/components/Auth/RegisterCorp/CorpInfoForm/CorpInfoForm";
import AddressesForm from "@/components/Auth/RegisterCorp/AddressesForm/AddressesForm";
import { useMediaQuery } from "react-responsive";
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
import {
	baseURL,
	getData,
	postData,
	putData,
	putDataFile,
} from "@/src/services/apiHub";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { setUser } from "@/src/store/slices/userSlice";
import TransparentLoading from "@/components/Loading/LoadingSpinner/TransparentLoading";
import useClientCheck from "@/src/hooks/useClientCheck";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";

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
	certificates: {
		vatTaxpayerCertificate: null,
		officialNewspaperAD: null,
	},
};
const resetFormValues = (
	setFieldValue: (field: string, value: any) => void
) => {
	setFieldValue("name", "");
	setFieldValue("registrationNumber", "");
	setFieldValue("nationalID", "");
	setFieldValue("iban", "");
	setFieldValue("signatories", []);
	setFieldValue("addresses", []);
	setFieldValue("contactInformation", []);
	setFieldValue("certificates.vatTaxpayerCertificate", null);
	setFieldValue("certificates.officialNewspaperAD", null);
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
			streetAddress: Yup.string().required("آدرس الزامی است"),
			postalCode: Yup.string()
				.required("کد پستی الزامی است")
				.length(10, "کد پستی باید 10 رقم باشد"),
			houseNumber: Yup.string().required("پلاک الزامی است"),
			unit: Yup.number().required("واحد الزامی است"),
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
	certificates: Yup.object().shape({
		vatTaxpayerCertificate: Yup.mixed()
			.required("استعلام مودیان مالیات بر ارزش افزوده الزامی است")
			.test("fileType", "فرمت فایل معتبر نیست", (value) => {
				const file = value as File;
				return value && ["image/jpeg", "image/png"].includes(file.type);
			}),
		officialNewspaperAD: Yup.mixed()
			.required("تصویر آگهی روزنامه رسمی آخرین تغییرات الزامی است")
			.test("fileType", "فرمت فایل معتبر نیست", (value) => {
				const file = value as File;
				return value && ["image/jpeg", "image/png"].includes(file.type);
			}),
	}),
});

// function getScreenType() {
// 	const width = window.innerWidth;
// 	if (width < 768) return "mobile";
// 	if (width < 1024) return "tablet";
// 	return "desktop";
// }

export default function Page() {
	const isClient = useClientCheck();
	const isMobile = useMediaQuery({ minWidth: 640 });
	const isTablet = useMediaQuery({ minWidth: 768 });
	const isDesktop = useMediaQuery({ minWidth: 1024 });
	// const [screenType, setScreenType] = useState(getScreenType());
	// const [corpId, setCorpId] = useState(0);
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const router = useRouter();
	const [step, setStep] = useState<number>(0);
	const [loadingButton, setLoadingButton] = useState<boolean>(false);
	const corp = useSelector((state: RootState) => state).corp;
	const user = useSelector((state: RootState) => state).user;
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const corpId = useSelector((state: RootState) => state.user.corpId);
	const onSubmit = async (
		values: corpData,
		setFieldValue: any,
		validateForm: any
	) => {
		// Validate the form values
		// await validateForm(values);
		setLoadingButton(true);
		if (step === 0) {
			if (corpId) {
				getData({
					endPoint: `${baseURL}/v1/user/corps/registration/${corpId}`,
				})
					.then(async (res) => {
						const formData: corpData = {};
						if (values.name != res.data.name) {
							formData["name"] = values.name;
						}
						if (
							values.registrationNumber !=
							res.data.registrationNumber
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
							formData["signatories"] = values.signatories;
						}
						console.log("formData in step 0", formData);
						if (
							values.name === "" ||
							values.registrationNumber === "" ||
							values.nationalID === "" ||
							values.iban === ""
						) {
							CustomToast(
								"اطلاعات خواسته شده را پر کنید",
								"warning"
							);
						} else {
							const signatoriesOk = await checkSignatories(
								formData
							);
							if (signatoriesOk) {
								if (Object.keys(formData).length !== 0) {
									putData({
										endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/basic`,
										data: formData,
									})
										.then((res) => {
											CustomToast(res.message, "success");
											if (step < steps.length - 1) {
												setStep(step + 1);
											}
											resetFormValues(setFieldValue);
										})
										.catch((err) => {
											console.log(err);
											CustomToast(
												generateErrorMessage(err),
												"error"
											);
										});
								} else {
									if (step < steps.length - 1) {
										setStep(step + 1);
									}
								}
							}
						}
					})
					.finally(() => setLoadingButton(false));
			} else {
				console.log("formData in step 0", values);
				if (
					values.name === "" ||
					values.registrationNumber === "" ||
					values.nationalID === "" ||
					values.iban === ""
				) {
					CustomToast("اطلاعات خواسته شده را پر کنید", "warning");
					setLoadingButton(false);
					return;
				} else if (values.signatories?.length === 0) {
					CustomToast(
						"افزودن حداقل یک صاحب امضا الزامی است",
						"warning"
					);
					setLoadingButton(false);
					return;
				} else {
					const signatoriesOk = await checkSignatories(values);
					if (signatoriesOk) {
						postData({
							endPoint: `${baseURL}/v1/user/corps/registration/basic`,
							data: {
								name: values.name,
								registrationNumber: String(
									values.registrationNumber
								),
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
								CustomToast(res?.message, "success");
								if (step < steps.length - 1) {
									setStep(step + 1);
								}

								resetFormValues(setFieldValue);
							})
							.catch((err) => {
								CustomToast(generateErrorMessage(err), "error");
							})
							.finally(() => setLoadingButton(false));
					}
				}
			}
		} else if (step === 1) {
			if (corpId) {
				getData({
					endPoint: `${baseURL}/v1/user/corps/registration/${corpId}`,
				})
					.then(async (res) => {
						const formData: corpData = {};
						if (values.contactInformation != res.data.contactInfo) {
							formData["contactInformation"] =
								values.contactInformation;
						}
						if (
							values.contactInformation?.length === 0 &&
							res.data.contactInfo.length === 0
						) {
							CustomToast(
								"افزودن حداقل یک راه ارتباطی الزامی است",
								"warning"
							);
							setLoadingButton(false);
							return;
						}
						console.log("formData in step 1", formData);
						const contactInformationOk =
							await checkContactInformationOk(formData);
						if (contactInformationOk) {
							if (formData?.contactInformation?.length !== 0) {
								postData({
									endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts`,
									data: formData,
								})
									.then((res) => {
										console.log("res", res);
										CustomToast(res?.message, "success");
										setFieldValue("contactInformation", []);
										if (step < steps.length - 1) {
											setStep(step + 1);
										}
									})
									.catch((err) => {
										console.log("err", err);
										CustomToast(
											generateErrorMessage(err),
											"error"
										);
									})
									.finally(() => setLoadingButton(false));
							} else {
								if (step < steps.length - 1) {
									setStep(step + 1);
									setLoadingButton(false);
								}
							}
						}
					})
					.catch((err) => {
						console.log("errr", err);
						setLoadingButton(false);
						CustomToast(generateErrorMessage(err), "error");
					});
			} else {
				CustomToast("شرکتی برای شما ثبت نشده است", "info");
				setLoadingButton(false);
			}
		} else if (step === 2) {
			if (corpId) {
				getData({
					endPoint: `${baseURL}/v1/user/corps/registration/${corpId}`,
				}).then(async (res) => {
					const formData: corpData = {};
					if (
						values.addresses?.length === 0 &&
						res.data.addresses.length === 0
					) {
						CustomToast(
							"افزودن حداقل یک آدرس الزامی است",
							"warning"
						);
						setLoadingButton(false);
						return;
					}
					if (values.addresses != res.data.addresses) {
						formData["addresses"] = values.addresses;
					}
					console.log("formData in step 2", values.addresses);

					const addressesOk = await checkAddressOk(formData);
					if (addressesOk) {
						if (formData?.addresses?.length !== 0) {
							postData({
								endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/address`,
								data: {
									addresses: values.addresses,
								},
							})
								.then((res) => {
									console.log("res", res);
									CustomToast(res?.message);
									setFieldValue("addresses", []);
									if (step < steps.length - 1) {
										setStep(step + 1);
									}
								})
								.catch((err) => {
									CustomToast(
										generateErrorMessage(err),
										"error"
									);
								})
								.finally(() => setLoadingButton(false));
						} else {
							if (step < steps.length - 1) {
								setStep(step + 1);
								setLoadingButton(false);
							}
						}
					}
				});
			} else {
				CustomToast("شرکتی برای شما ثبت نشده است", "info");
				setLoadingButton(false);
			}
		} else if (step === 3) {
			if (corpId) {
				if (
					!values.certificates?.vatTaxpayerCertificate ||
					!values.certificates?.officialNewspaperAD
				) {
					CustomToast(
						"لطفا مدرک خواسته شده را بارگذاری کنید.",
						"warning"
					);
					setLoadingButton(false);
					return;
				}

				const formData = new FormData();
				formData.append(
					"vatTaxpayerCertificate",
					values.certificates?.vatTaxpayerCertificate
				);
				formData.append(
					"officialNewspaperAD",
					values.certificates?.officialNewspaperAD
				);
				console.log("formData in step 3", formData);
				setLoading(true);
				putDataFile({
					endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/certificates`,
					formData: formData,
				})
					.then((res) => {
						console.log("result file", res);
						CustomToast(res?.message, "success");
						router.push("/");
						setLoading(false);
					})
					.catch((error) => {
						console.log(error);
						CustomToast(generateErrorMessage(error), "error");
						setLoading(false);
					})
					.finally(() => setLoadingButton(false));
			} else {
				CustomToast("شرکتی برای شما ثبت نشده است", "info");
				setLoadingButton(false);
			}
		}
	};
	const checkSignatories = async (formData: corpData) => {
		for (const signatory of formData["signatories"] || []) {
			// formData["signatories"]?.forEach((signatory) => {
			if (
				signatory.nationalCardNumber === "" ||
				signatory.name === "" ||
				signatory.position === ""
			) {
				CustomToast("اطلاعات صاحبان امضا را کامل وارد کنید", "warning");
				setLoadingButton(false);
				return false;
			}
			if (signatory.nationalCardNumber.length !== 10) {
				CustomToast("فرمت کد ملی صاحبان امضا صحیح نمی‌باشد", "warning");
				setLoadingButton(false);
				return false;
			}
		}
		return true;
	};
	const checkContactInformationOk = async (formData: corpData) => {
		for (const contact of formData["contactInformation"] || []) {
			if (!contact.contactTypeID) {
				CustomToast("نوع راه ارتباطی را تعیین کنید", "warning");
				setLoadingButton(false);
				return false;
			}
			if (!contact.contactValue) {
				CustomToast("مقدار راه ارتباطی را وارد کنید", "warning");
				setLoadingButton(false);
				return false;
			}
		}
		return true;
	};
	const checkAddressOk = async (formData: corpData) => {
		for (const address of formData["addresses"] || []) {
			if (!address.provinceID) {
				CustomToast("مقدار استان را انتخاب کنید", "warning");
				setLoadingButton(false);
				return false;
			}
			if (!address.cityID) {
				CustomToast("مقدار شهر را انتخاب کنید", "warning");
				setLoadingButton(false);
				return false;
			}
			if (!address.cityID) {
				CustomToast("مقدار شهر را انتخاب کنید", "warning");
				setLoadingButton(false);
				return false;
			}
			if (!address.streetAddress) {
				CustomToast("آدرس را وارد کنید", "warning");
				setLoadingButton(false);
				return false;
			}
			if (address.postalCode === "") {
				CustomToast("کد پستی را وارد کنید", "warning");
				setLoadingButton(false);
				return false;
			}
			if (String(address.postalCode).length !== 10) {
				CustomToast("فرمت کد پستی صحیح نمی‌باشد", "warning");
				setLoadingButton(false);
				return false;
			}
			if (address.houseNumber === "") {
				CustomToast("پلاک را وارد کنید", "warning");
				setLoadingButton(false);
				return false;
			}
			if (address.unit === "") {
				CustomToast("واحد را وارد کنید", "warning");
				setLoadingButton(false);
				return false;
			}
		}
		return true;
	};
	useEffect(() => {
		if (!accessToken) {
			router.push("/login");
		}
	}, [accessToken, router]);
	const handleBack = () => {
		if (step > 0) {
			setStep(step - 1);
		}
	};
	if (!isClient) return <LoadingSpinner />;
	return (
		<>
			<div className="w-screen min-h-screen h-fit place-items-center flex place-content-center items-center transition-all duration-300 ease-in-out bg-[#F0EDEF]">
				<div className="space-y-4 rtl vazir m-auto sm:pb-6 h-2/3 sm:w-2/3 md:w-2/3 lg:w-3/5 w-5/6 my-20">
					<div className="flex items-center justify-center">
						{Array.from({ length: steps.length }).map(
							(_, index) => (
								<div
									key={index}
									className={`flex items-center`}
								>
									<Badge
										data-test={`step-${index}`}
										className={cn(
											"rounded-full sm:w-12 md:w-36 lg:w-42 transition-all duration-300 ease-in-out text-md neu-shadow gap-2 p-2 bg-gradient-to-r",
											index === step
												? "from-[#A55FDA] to-[#F37240] text-black/80"
												: index > step
												? "from-[#A55FDA]/30 to-[#F37240]/30 text-black"
												: "from-[#A55FDA] to-[#F37240] text-white"
										)}
										key={index}
									>
										{isTablet && steps[index]}
										{/* <p className="lg:visible md:hidden sm:hidden hidden">{steps[index]}</p> */}
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
							)
						)}
					</div>
					{!isTablet && (
						<div className="text-center text-xl font-bold mt-7">
							{steps[step]}
						</div>
					)}

					<Formik
						initialValues={initialValuesForm}
						validationSchema={validationSchemaForm}
						onSubmit={(values, { setFieldValue, validateForm }) =>
							onSubmit(values, setFieldValue, validateForm)
						}
					>
						{({ setFieldValue, values, validateForm }) => (
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
												// screenType={screenType}
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
										data-test="submit-button"
										onClick={() => {
											onSubmit(
												values,
												setFieldValue,
												validateForm
											);
										}}
									>
										{loadingButton ? (
											<div className="flex place-content-center">
												<LoadingOnButton size={28} />
											</div>
										) : step === steps.length - 1 ? (
											<p>تایید</p>
										) : (
											<p>بعدی</p>
										)}
									</button>
									{step > 0 && (
										<button
											type="button"
											className="hover:cursor-pointer cta-neu-button w-1/4"
											onClick={() => {
												handleBack();
												resetFormValues(setFieldValue);
											}}
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
		</>
	);
}
