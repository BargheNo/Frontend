import styles from "./AddressesForm.module.css";
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
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { baseURL, deleteData, getData, postData } from "@/src/services/apiHub";
import { useSelector } from "react-redux";
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

export default function AddressesForm({
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
	const [addresses, setAddresses] = useState<Address[]>();
	const [cities, setCities] = useState<City[]>([]);
	const [provinces, setProvinces] = useState<Province[]>([]);
	const [provinceId, setProvinceId] = useState<number>();
	const [disable, setDisable] = useState(true);
	const [cityId, setCityId] = useState<number>();
	const [loading, setLoading] = useState<boolean>(true);
	const corpId = useSelector((state: RootState) => state.user.corpId);
	const FindCityid = (cities: City[], name: string) => {
		const city = cities.find((p) => p.name === name);
		return city?.ID ?? null;
	};
	const Getprovinces = () => {
		provinceService
			.GetProvinces()
			.then((res) => {
				setProvinces(res.data.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	useEffect(() => {
		Getprovinces();
	}, []);

	const UpdateCityList = (provinceId: number) => {
		provinceService
			.GetCities(provinceId)
			.then((res) => setCities(res.data.data))
			.catch((err) => console.log(err.message));
	};
	const findProvinceId = (provinces: Province[], name: any) => {
		const province = provinces.find((p) => p.name === name);
		return province?.ID ?? null;
	};
	useEffect(() => {
		UpdateCityList(provinceId ?? 1);
	}, [provinceId]);
	useEffect(() => {
		setLoading(true);
		getData({
			endPoint: `${baseURL}/v1/user/corps/registration/${corpId}`,
		})
			.then((res) => {
				console.log("res address", res);
				setAddresses(res.data.addresses);
				// setFieldValue("addresses", res.data.addresses);
				setLoading(false);
			})
			.catch((err) => {
				toast(generateErrorMessage(err));
				setLoading(false);
			});
	}, []);
	useEffect(() => {
		console.log(addresses);
	}, [addresses]);
	if (loading)
		return (
			<div className="h-fit">
				<LoadingSpinner />
			</div>
		);
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-8 w-full">
				{addresses?.map((address, index) => (
					<div key={index} className="flex gap-3 h-full">
						<div
							className="hover:cursor-pointer text-fire-orange font-bold text-xl neu-shadow w-8 text-center place-content-center rounded-md bg-[#F1F4FC] group"
							onClick={() => {
								setAddresses(
									addresses?.filter(
										(add) => add.ID !== address.ID
									)
								);
								deleteData({
									endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/address/${address.ID}`,
									// endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts/0`,
								}).then((res) => {
									toast(res.message);
								});
								// removeAddress(id);
							}}
						>
							<span className="absolute group-hover:opacity-0 transition-opacity duration-300 translate-x-[6px] -translate-y-[10px]">
								{index + 1}
							</span>
							<XIcon className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-[3px] -translate-y-[10px]" />
						</div>
						<div className="flex flex-col w-full">
							<div className="flex w-full h-full gap-4">
								{/* <Select
									value={String(address.province)}
									name={`addresses.[${index}].provinceID`}
								>
									<SelectTrigger
										disabled={true}
										value={address.province}
										className={`${styles.CustomInput} cursor-pointer`}
									>
										<SelectValue placeholder="استان" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup className="vazir">
											<SelectLabel>استان</SelectLabel>
											{provinces?.length > 0 ? (
												provinces.map(
													(province, index) => (
														<SelectItem
															key={index}
															value={String(
																province.name
															)}
															className="cursor-pointer"
														>
															{province.name}
														</SelectItem>
													)
												)
											) : (
												<p>هیچ استانی یافت نشد</p>
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
								<Select
									value={String(address.city)}
									name={`addresses.[${index}].cityID`}
								>
									<SelectTrigger
										disabled={disable}
										value={address.city}
										className={`${styles.CustomInput} cursor-pointer`}
									>
										<SelectValue placeholder="شهر" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup className="vazir">
											<SelectLabel>شهر</SelectLabel>
											{cities?.length > 0 ? (
												cities.map((city, index) => (
													<SelectItem
														key={index}
														value={String(
															city.name
														)}
														className="cursor-pointer"
													>
														{city.name}
													</SelectItem>
												))
											) : (
												<p>هیچ شهری یافت نشد</p>
											)}
										</SelectGroup>
									</SelectContent>
								</Select> */}
								<CustomInput
									name={`province`}
									value={address.province}
									disabled
									/>
								<CustomInput
									name={`city`}
									value={address.city}
									disabled
								/>
							</div>
							<CustomTextArea
								name={`streetAddress`}
								value={address.streetAddress}
								disabled
								// name="streetAddress"
								placeholder="آدرس"
								icon={MapPin}
							/>
							<div className="flex gap-4">
								<CustomInput
									name={`postalCode`}
									value={address.postalCode}
									disabled
									// name="postalCode"
									placeholder="کد پستی"
									icon={Mailbox}
								/>
								<CustomInput
									name={`houseNumber`}
									value={address.houseNumber}
									disabled
									// name="houseNumber"
									placeholder="پلاک"
									icon={Building}
								/>
								<CustomInput
									name={`addresses.[${index}].unit`}
									value={address.unit}
									disabled
									// name="unit"
									placeholder="واحد"
									icon={Home}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
			{/*  ------------------------------------------------------------------------------------------ */}
			<Form className="flex flex-col gap-8">
				<FieldArray name="addresses">
					{({ push, remove }) => (
						<>
							{values.addresses?.map((address, index) => (
								<div key={index} className="flex gap-3 h-full">
									<div
										className="hover:cursor-pointer text-fire-orange font-bold text-xl neu-shadow w-8 text-center place-content-center rounded-md bg-[#F1F4FC] group"
										onClick={() => {
											remove(index);
											// removeAddress(id);
										}}
									>
										<span className="absolute group-hover:opacity-0 transition-opacity duration-300 translate-x-[6px] -translate-y-[10px]">
											{(addresses || []).length + index + 1}
										</span>
										<XIcon className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-[3px] -translate-y-[10px]" />
									</div>
									<div className="flex flex-col w-full">
										<div className="flex w-full h-full gap-4">
											<Select
												value={String(
													values.addresses?.[index]
														.provinceID
												)}
												name={`addresses.[${index}].provinceID`}
												onValueChange={(value) => {
													setDisable(false);
													setFieldValue(
														`addresses.[${index}].provinceID`,
														Number(value)
													);
													setFieldValue(
														`addresses.[${index}].cityID`,
														""
													);
													console.log(
														"provinces",
														provinces
													);
													const province =
														provinces?.find(
															(p) =>
																p.ID ===
																Number(value)
														);
													const provinceId =
														province?.ID ?? 1;
													// return province?.ID ?? null;
													// const provinceId =
													// 	findProvinceId(
													// 		provinces,
													// 		String(value)
													// 	);

													console.log(
														"provinceId",
														provinceId
													);
													setProvinceId(
														provinceId ?? 1
													);
													if (provinceId)
														UpdateCityList(
															provinceId
														);
												}}
											>
												<SelectTrigger
													value={address.provinceID}
													// name={`addresses.[${index}].province`}

													className={`${styles.CustomInput} cursor-pointer`}
												>
													<SelectValue placeholder="استان" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup className="vazir">
														<SelectLabel>
															استان
														</SelectLabel>
														{provinces?.length >
														0 ? (
															provinces.map(
																(
																	province,
																	index
																) => (
																	<SelectItem
																		key={
																			index
																		}
																		value={String(
																			province.ID
																		)}
																		className="cursor-pointer"
																	>
																		{
																			province.name
																		}
																	</SelectItem>
																)
															)
														) : (
															<p>
																هیچ استانی یافت
																نشد
															</p>
														)}
													</SelectGroup>
												</SelectContent>
											</Select>
											<Select
												name={`addresses.[${index}].cityID`}
												value={String(
													values.addresses?.[index]
														.cityID
												)}
												disabled={disable}
												onValueChange={(value) => {
													const iD = FindCityid(
														cities,
														value
													);
													setCityId(iD ?? 1);
													setFieldValue(
														`addresses.[${index}].cityID`,
														Number(value)
													);
												}}
											>
												<SelectTrigger
													disabled={disable}
													className={`${styles.CustomInput} cursor-pointer`}
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
																(
																	city,
																	index
																) => (
																	<SelectItem
																		key={
																			index
																		}
																		value={String(
																			city.ID
																		)}
																		className="cursor-pointer"
																	>
																		{Object.values(
																			city.name
																		)}
																	</SelectItem>
																)
															)
														) : (
															<p>
																هیچ شهری یافت
																نشد
															</p>
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
											/>
											<CustomInput
												name={`addresses.[${index}].houseNumber`}
												// name="houseNumber"
												placeholder="پلاک"
												icon={Building}
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
									if ((values.addresses || []).length < 10) {
										push({
											provinceID: "",
											cityID: "",
											streetAddress: "",
											postalCode: "",
											houseNumber: "",
											unit: "",
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
		</div>
	);
}
