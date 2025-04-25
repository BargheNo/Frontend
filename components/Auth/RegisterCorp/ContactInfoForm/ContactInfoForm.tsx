import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { FieldArray } from "formik";
import style from "./ContactInfoForm.module.css";
import { Phone, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { baseURL, deleteData, getData } from "@/src/services/apiHub";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { toast } from "sonner";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { useSelector } from "react-redux";

export default function ContactInfoForm({
	setFieldValue,
	values,
}: {
	setFieldValue?: any;
	values: corpData;
}) {
	const [loading, setLoading] = useState<boolean>(true);
	const [contactTypes, setContactTypes] = useState<contactType[]>([]);
	const [contactTypesList, setContactTypesList] = useState([]);
	const corpId = useSelector((state: RootState) => state.user.corpId);
	useEffect(() => {
		getData({ endPoint: `${baseURL}/v1/contact/types` }).then((res) => {
			setContactTypes(res.data);
		});
		getData({
			endPoint: `${baseURL}/v1/user/corps/registration/${corpId}`,
		})
			.then((res) => {
				const transformed = res.data.contactInfo.map(
					(item: {
						contactType: { id: number; name: string };
						value: string;
					}) => ({
						contactTypeID: item.contactType.id,
						contactValue: item.value,
					})
				);
				// setContactTypesList(transformed);
				setContactTypesList(res.data.contactInfo);
				// setFieldValue("contactInformation", transformed);
				setLoading(false);
			})
			.catch((err) => {
				toast(generateErrorMessage(err));
				setLoading(false);
			});
	}, []);
	useEffect(() => {
		console.log(contactTypesList);
	}, [contactTypesList]);
	if (loading)
		return (
			<div className="h-fit">
				<LoadingSpinner />
			</div>
		);
	return (
		<>
			{contactTypesList.map((contactInfo: contactType, index) => (
				<div key={index} className="flex gap-3 items-end w-full">
					<div className="flex w-[95%] gap-3">
						<Select
							disabled={true}
							value={String(contactInfo?.contactType?.id)}
							name={`contactInformation.[${index}].contactTypeID`}
							onValueChange={(value) => {
								// console.log("contactInfo", contactInfo);
								// Setbuilding(value);
								setFieldValue(
									`contactInformation.[${index}].contactTypeID`,
									Number(value)
								);
							}}
						>
							<SelectTrigger
								className={`${style.CustomInput} mt-[25px] min-h-[43px] cursor-pointer `}
							>
								<SelectValue placeholder="راه ارتباطی" />
							</SelectTrigger>
							<SelectContent className="vazir">
								<SelectGroup>
									<SelectLabel>راه ارتباطی</SelectLabel>
									{contactTypes?.length > 0 ? (
										contactTypes.map(
											(contactType, index) => (
												<SelectItem
													key={index}
													value={String(
														contactType.id
													)}
												>
													{contactType.name}
												</SelectItem>
											)
										)
									) : (
										<p>هیچ راه ارتباطی یافت نشد</p>
									)}
								</SelectGroup>
							</SelectContent>
						</Select>
						<CustomInput
							name="sth"
							value={String(contactInfo?.value)}
							disabled={true}
							icon={Phone}
						/>
					</div>
					<XIcon
						className="text-fire-orange rounded-sm hover:cursor-pointer flex mb-3 w-fit"
						onClick={() => {
							deleteData({
								endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts/${contactInfo?.ID}`,
								// endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts/0`,
							}).then((res) => {
								toast(res.message);
								// setContactTypesList(
								// 	contactTypesList.filter(
								// 		(contact) =>
								// 			contact.ID !== contactInfo.ID
								// 	)
								// );
							});
						}}
					/>
				</div>
			))}
			<FieldArray name="contactInformation">
				{({ push, remove }) => (
					<>
						{values.contactInformation?.map(
							(contactInfo, index) => (
								<div
									key={index}
									className="flex gap-3 items-end w-full"
								>
									<div className="flex w-[95%] gap-3">
										<Select
											// value={String(
											// 	values.contactInformation[index]
											// 		.contactTypeID
											// )}
											name={`contactInformation.[${index}].contactTypeID`}
											onValueChange={(value) => {
												// console.log("contactInfo", contactInfo);
												// Setbuilding(value);
												setFieldValue(
													`contactInformation.[${index}].contactTypeID`,
													Number(value)
												);
											}}
										>
											<SelectTrigger
												className={`${style.CustomInput} mt-[25px] min-h-[43px] cursor-pointer `}
											>
												<SelectValue placeholder="راه ارتباطی" />
											</SelectTrigger>
											<SelectContent className="vazir">
												<SelectGroup>
													<SelectLabel>
														راه ارتباطی
													</SelectLabel>
													{contactTypes?.length >
													0 ? (
														contactTypes.map(
															(
																contactType,
																index
															) => (
																<SelectItem
																	key={index}
																	value={String(
																		contactType.id
																	)}
																>
																	{
																		contactType.name
																	}
																</SelectItem>
															)
														)
													) : (
														<p>
															هیچ راه ارتباطی یافت
															نشد
														</p>
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
										<CustomInput
											name={`contactInformation.[${index}].contactValue`}
											placeholder="اطلاعات تماس"
											icon={Phone}
										/>
									</div>
									<XIcon
										className="text-fire-orange rounded-sm hover:cursor-pointer flex mb-3 w-fit"
										onClick={() => {
											remove(index);
											deleteData({
												endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts/${contactInfo.contactTypeID}`,
												// endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts/0`,
											});
										}}
									/>
								</div>
							)
						)}

						<button
							className="place-self-start cta-neu-button w-1/3 mt-8"
							onClick={() => {
								push({
									contactTypeID: 0,
									contactValue: "",
								});
							}}
						>
							افزودن اطلاعات تماس
						</button>
					</>
				)}
			</FieldArray>
		</>
	);
}
