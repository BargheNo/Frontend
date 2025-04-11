"use client";

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
// import CustomInput from "@/components/Custom/CustomInput/CustomInput";
// import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import provinceService from "@/src/services/provinceService";
import { City, Province } from "@/src/types/provinceType";
import CorpInfoForm from "@/components/Auth/RegisterCorp/CorpInfoForm/CorpInfoForm";
import ContactInfoForm from "@/components/Auth/RegisterCorp/ContactInfoForm/ContactInfoForm";
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
import { Building2, FileText, Phone } from "lucide-react";

const steps = ["اطلاعات شرکت", "اطلاعات تماس", "مدارک"];
const icons = [
	<Building2 className="w-5" key="اطلاعات شرکت" />,
	<Phone className="w-5" key="اطلاعات تمایس" />,
	<FileText className="w-5" key="مدارک" />,
];
const initialValuesForm = {
	corpName: "",
	registrationNumber: "",
	nationalID: "",
	iban: "",
	signatories: [],
	addresses: [],
};

const validationSchemaForm = Yup.object({
	corpName: Yup.string().required("نام شرکت الزامی است"),
	registrationNumber: Yup.string().required("شماره ثبت الزامی است"),
	nationalID: Yup.string().required("شناسه ملی الزامی است"),
	iban: Yup.string().required("شماره شبا الزامی است"),
	signatories: Yup.array().of(
		Yup.object().shape({
			signatoryName: Yup.string().required("نام صاحب امضا الزامی است"),
			nationalID: Yup.string()
				.required("کد ملی صاحب امضا الزامی است")
				.length(10, "کد ملی باید 10 رقم باشد"),
			position: Yup.string(),
		})
	),
	addresses: Yup.array().of(
		Yup.object().shape({
			province: Yup.string().required("این فیلد الزامی است"),
			city: Yup.string().required("این فیلد الزامی است"),
			streetAddress: Yup.string().required("این فیلد الزامی است"),
			postalCode: Yup.string()
				.required("کد پستی الزامی است")
				.length(10, "کد پستی باید 10 رقم باشد"),
			houseNumber: Yup.string().optional(),
			unit: Yup.number().optional(),
		})
	),
});

export default function Page() {
	const dispatch = useDispatch();

	// const [cities, setCities] = useState<City[]>([]);
	// const [provinces, setProvinces] = useState<Province[]>([]);
	// const [provinceId, setProvinceId] = useState<number>();
	// const [disable, setDisable] = useState(true);
	// const [cityId, setCityId] = useState<number>();
	const [step, setStep] = useState<number>(0);

	// const [addresses, setAddresses] = useState<string[]>([]);
	// const [signatories, setSignatories] = useState<string[]>([]);

	// const getProvinces = () => {
	// 	provinceService
	// 		.GetProvinces()
	// 		.then((res) => {
	// 			Setprovinces(res.data.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.message);
	// 		});
	// };
	// const UpdateCityList = (provinceId: number) => {
	// 	provinceService
	// 		.GetCities(provinceId)
	// 		.then((res) => setCities(res.data.data))
	// 		.catch((err) => console.log(err.message));
	// };
	// const Findprovinceid = (provinces: Province[], name: string) => {
	// 	const province = provinces.find((p) => p.name === name);
	// 	return province?.ID ?? null;
	// };
	// const FindCityid = (cities: City[], name: string) => {
	// 	const city = cities.find((p) => p.name === name);
	// 	return city?.ID ?? null;
	// };
	// useEffect(() => {
	// 	UpdateCityList(provinceid ?? 1);
	// }, [provinceId]);
	// useEffect(() => {
	// 	Getprovinces();
	// }, []);
	const corp = useSelector((state: RootState) => state).corp;
	const onSubmit = async (values: corpData) => {
		await handleFormSubmit(values);
		// console.log("signatories", values.signatories);
		console.log("values", values);
		if (step < steps.length - 1) {
			setStep(step + 1);
		} else {
			// submit form
		}
	};
	const handleFormSubmit = async (values: corpData) => {
		// console.log(values);
		dispatch(
			setCorp({
				...corp,
				corpName: values.corpName,
				registrationNumber: values.registrationNumber,
				nationalID: values.nationalID,
				iban: values.iban,
				signatories: values.signatories,
				addresses: values.addresses,
			})
		);
	};
	const handleBack = (values: corpData) => {
		dispatch(
			setCorp({
				...corp,
				corpName: values.corpName,
				registrationNumber: values.registrationNumber,
				nationalID: values.nationalID,
				iban: values.iban,
				signatories: values.signatories,
				addresses: values.addresses,
			})
		);
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
									"rounded-full w-44 transition-all duration-300 ease-in-out text-md neu-shadow gap-2 p-2 bg-gradient-to-r ",
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
											// step={step}
											// setStep={setStep}
											// steps={steps}
											// signatories={signatories}
											// setSignatories={setSignatories}
											values={values}
										/>
									)}
									{step === 1 && (
										<ContactInfoForm
											// step={step}
											// setStep={setStep}
											// steps={steps}
											// addresses={addresses}
											// setAddresses={setAddresses}
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
									onClick={() => onSubmit(values)}
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
