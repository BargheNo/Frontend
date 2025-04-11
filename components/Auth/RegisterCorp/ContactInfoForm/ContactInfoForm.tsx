import styles from "./ContactInfoForm.module.css";
import React, { useEffect, useState } from "react";
import provinceService from "@/src/services/provinceService";
import { City, Province } from "@/src/types/provinceType";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { v4 as uuidv4 } from "uuid";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import { Building, Home, Mailbox, MapPin, XIcon } from "lucide-react";
import { Form, FieldArray } from "formik";
import { toast } from "sonner";
// import { setCorp } from "@/src/store/slices/corpSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

// const initialValuesForm = { addresses: [] };
// const validationSchemaForm = Yup.object({
// 	addresses: Yup.array().of(
// 		Yup.object().shape({
// 			province: Yup.string().required("این فیلد الزامی است"),
// 			city: Yup.string().required("این فیلد الزامی است"),
// 			streetAddress: Yup.string().required("این فیلد الزامی است"),
// 			postalCode: Yup.string()
// 				.required("کد پستی الزامی است")
// 				.length(10, "کد پستی باید 10 رقم باشد"),
// 			houseNumber: Yup.string().optional(),
// 			unit: Yup.number().optional(),
// 		})
// 	),
// });

export default function ContactInfoForm({
	// step,
	// setStep,
	// steps,
	// addresses,
	// setAddresses,
	setFieldValue,
	values,
}: {
	// step: number;
	// setStep: (step: number) => void;
	// steps: string[];
	// addresses: string[];
	// setAddresses: React.Dispatch<React.SetStateAction<string[]>>;
	setFieldValue: any;
	values: corpData;
}) {
	// const dispatch = useDispatch();
	const [cities, setCities] = useState<City[]>([]);
	const [provinces, setProvinces] = useState<Province[]>([]);
	const [provinceId, setProvinceId] = useState<number>();
	const [disable, setDisable] = useState(true);
	const [cityId, setCityId] = useState<number>();
	const FindCityid = (cities: City[], name: string) => {
		const city = cities.find((p) => p.name === name);
		return city?.ID ?? null;
	};
	// const addAddress = () => {
	// 	setAddresses((prev) => [...prev, uuidv4()]);
	// };
	// const removeAddress = (id: string) => {
	// 	setAddresses((prev) => prev.filter((item) => item !== id));
	// };
	// const corp = useSelector((state: RootState) => state).corp;
	// const handleFormSubmit = (values: corpData) => {
	// 	dispatch(
	// 		setCorp({
	// 			...corp,
	// 			corpName: values.corpName,
	// 			registrationNumber: values.registrationNumber,
	// 			nationalID: values.nationalID,
	// 			iban: values.iban,
	// 			signatories: values.signatories,
	// 			addresses: values.addresses,
	// 		})
	// 	);
	// };
	const Getprovinces = () => {
		provinceService
			.GetProvinces()
			.then((res) => {
				setProvinces(res.data.data);
				console.log("provinces", res.data.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	useEffect(() => {
		Getprovinces();
	}, []);
	// useEffect(() => {
	// 	console.log(addresses);
	// }, [addresses]);

	const UpdateCityList = (provinceId: number) => {
		provinceService
			.GetCities(provinceId)
			.then((res) => setCities(res.data.data))
			.catch((err) => console.log(err.message));
	};
	const findProvinceId = (provinces: Province[], name: string) => {
		const province = provinces.find((p) => p.name === name);
		return province?.ID ?? null;
	};
	useEffect(() => {
		UpdateCityList(provinceId ?? 1);
	}, [provinceId]);
	return (
		<Form className="flex flex-col gap-8">
			<FieldArray name="addresses">
				{({ push, remove }) => (
					<>
						{values.addresses.map((id, index) => (
							<div key={index} className="flex gap-3 h-full">
								<div
									className="hover:cursor-pointer text-fire-orange font-bold text-xl neu-shadow w-8 text-center place-content-center rounded-md bg-[#F1F4FC] group"
									onClick={() => {
										remove(index);
										// removeAddress(id);
									}}
								>
									<span className="absolute group-hover:opacity-0 transition-opacity duration-300 translate-x-[6px] -translate-y-[10px]">
										{index + 1}
									</span>
									<XIcon className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-[3px] -translate-y-[10px]" />
								</div>
								<div className="flex flex-col">
									<div className="flex w-full h-full gap-4">
										<Select
											value={
												values.addresses[index].province
											}
											name={`addresses.[${index}].province`}
											onValueChange={(value) => {
												setDisable(false);
												// setAddresses((pre) => [...pre, value]);
												// setAddresses((prev) =>
												// 	prev.map((item) =>
												// 		String(item) === String(id)
												// 			? value
												// 			: item
												// 	)
												// );
												setFieldValue(
													`addresses.[${index}].province`,
													value
												);
												console.log(values);
												// setFieldValue(`addresses.${id}.city`, "");

												const provinceId =
													findProvinceId(
														provinces,
														value
													);
												setProvinceId(provinceId ?? 1);
												if (provinceId)
													UpdateCityList(provinceId);
											}}
										>
											<SelectTrigger
												value={
													values.addresses[index]
														.province
												}
												onChange={() => {
													console.log(values);
												}}
												name={`addresses.[${index}].province`}
												className={`${styles.CustomInput}`}
											>
												<SelectValue placeholder="استان" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup className="vazir">
													<SelectLabel>
														استان
													</SelectLabel>
													{provinces?.length > 0 ? (
														provinces.map(
															(
																province,
																index
															) => (
																<SelectItem
																	key={index}
																	value={
																		province.name
																	}
																>
																	{
																		province.name
																	}
																</SelectItem>
															)
														)
													) : (
														<p>
															هیچ استانی یافت نشد
														</p>
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
										<Select
											name={`addresses.[${index}].city`}
											disabled={disable}
											onValueChange={(value) => {
												const iD = FindCityid(
													cities,
													value
												);
												setCityId(iD ?? 1);
												// setFieldValue("city", value);
											}}
										>
											<SelectTrigger
												disabled={disable}
												className={styles.CustomInput}
											>
												<SelectValue placeholder="شهر" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup className="vazir">
													<SelectLabel>
														شهر
													</SelectLabel>
													{cities?.length > 0 ? (
														cities.map(
															(city, index) => (
																<SelectItem
																	key={index}
																	value={
																		city.name
																	}
																>
																	{Object.values(
																		city.name
																	)}
																</SelectItem>
															)
														)
													) : (
														<p>هیچ شهری یافت نشد</p>
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
									<CustomTextArea
										name={`addresses.[${index}].streetAddress`}
										// name="streetAddress"
										placeholder="آدرس"
										icon={MapPin}
									/>
									<div className="flex gap-4">
										<CustomInput
											name={`addresses.[${index}].postalCode`}
											// name="postalCode"
											placeholder="کد پستی"
											icon={Mailbox}
											type="number"
										/>
										<CustomInput
											name={`addresses.[${index}].houseNumber`}
											// name="houseNumber"
											placeholder="پلاک"
											icon={Building}
											type="number"
										/>
										<CustomInput
											name={`addresses.[${index}].unit`}
											// name="unit"
											placeholder="واحد"
											icon={Home}
											type="number"
										/>
									</div>
								</div>
							</div>
						))}
						<button
							className={`place-self-start cta-neu-button w-1/3 mt-4`}
							onClick={() => {
								// addAddress();
								if (values.addresses.length < 10) {
									push({
										province: "",
										city: "",
										streetAddress: "",
										postalCode: "",
										houseNumber: "",
										unit: 0,
									});
								} else {
									toast(
										"شما حداکثر مقدار آدرس را اضافه کرده‌اید"
									);
								}
							}}
						>
							افزودن آدرس
						</button>
					</>
				)}
			</FieldArray>
		</Form>
	);
}
