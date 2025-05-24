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
import { useMediaQuery } from "react-responsive";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

export default function ContactInfoForm({
	setFieldValue,
	values,
}: {
	setFieldValue?: any;
	values: corpData;
}) {
	const isMobile = useMediaQuery({ minWidth: 640 });
	const isTablet = useMediaQuery({ minWidth: 768 });
	const isDesktop = useMediaQuery({ minWidth: 1024 });
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
				setContactTypesList(res.data.contactInfo);
				setLoading(false);
			})
			.catch((err) => {
				CustomToast(generateErrorMessage(err), "error");
				// toast(generateErrorMessage(err));
				setLoading(false);
			});
	}, []);
	useEffect(() => {
		console.log("contactTypesList", contactTypesList);
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
				<>
					{!isTablet && index > 0 && (
						<div className="mt-6 border-solid border-1 border-gray-200 rounded-full" />
					)}
					{!isTablet ? ( //small size
						<div
							key={index}
							className="flex flex-col items-end w-full"
						>
							<Select
								disabled={true}
								value={String(contactInfo?.contactType?.id)}
								name={`contactInformation.[${index}].contactTypeID`}
								onValueChange={(value) => {
									setFieldValue(
										`contactInformation.[${index}].contactTypeID`,
										Number(value)
									);
								}}
							>
								<SelectTrigger
									className={`${style.CustomInput} mt-[25px] min-h-[43px] cursor-pointer w-full`}
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
							<div className="flex w-full gap-3">
								<CustomInput
									name="sth"
									value={String(contactInfo?.value)}
									disabled={true}
									icon={Phone}
								/>
								<XIcon
									className="text-fire-orange rounded-sm hover:cursor-pointer flex mt-8 w-fit"
									onClick={() => {
										setContactTypesList(
											contactTypesList.filter(
												(contact: contactType) =>
													contact.ID !==
													contactInfo.ID
											)
										);
										deleteData({
											endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts/${contactInfo?.ID}`,
										}).then((res) => {
											CustomToast(
												res?.message,
												"success"
											);
											// toast(res?.message);
										});
									}}
								/>
							</div>
						</div>
					) : (
						// big size
						<div
							key={index}
							className="flex gap-3 items-end w-full"
						>
							<div className="flex flex-row lg:flex-row md:flex-row sm:flex-col w-[95%] gap-3">
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
										className={`${style.CustomInput} mt-[25px] min-h-[43px] cursor-pointer w-full`}
									>
										<SelectValue placeholder="راه ارتباطی" />
									</SelectTrigger>
									<SelectContent className="vazir">
										<SelectGroup>
											<SelectLabel>
												راه ارتباطی
											</SelectLabel>
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
									setContactTypesList(
										contactTypesList.filter(
											(contact: contactType) =>
												contact.ID !== contactInfo.ID
										)
									);
									deleteData({
										endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts/${contactInfo?.ID}`,
										// endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts/0`,
									}).then((res) => {
										CustomToast(res?.message, "success");
										// toast(res?.message);
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
					)}
				</>
			))}
			<FieldArray name="contactInformation">
				{({ push, remove }) => (
					<>
						{values.contactInformation?.map(
							(contactInfo, index) => (
								<>
									{!isTablet &&
										(index > 0 ||
											contactTypesList.length > 0) && (
											<div className="mt-6 border-solid border-1 border-gray-200 rounded-full" />
										)}
									<div key={index} className="flex w-full">
										{!isTablet ? ( // it was small
											<div className="flex flex-col w-full">
												<Select
													name={`contactInformation.[${index}].contactTypeID`}
													onValueChange={(value) => {
														setFieldValue(
															`contactInformation.[${index}].contactTypeID`,
															Number(value)
														);
													}}
												>
													<SelectTrigger
														data-test="select-contact-type"
														className={`${style.CustomInput} w-full mt-[25px] min-h-[43px] cursor-pointer`}
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
																			key={
																				index
																			}
																			data-test={`option-${index}`}
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
																	هیچ راه
																	ارتباطی یافت
																	نشد
																</p>
															)}
														</SelectGroup>
													</SelectContent>
												</Select>
												<div className="flex items-center gap-3">
													<CustomInput
														name={`contactInformation.[${index}].contactValue`}
														placeholder="اطلاعات تماس"
														icon={Phone}
													/>
													<XIcon
														className="text-fire-orange rounded-sm hover:cursor-pointer mt-5 flex w-fit"
														onClick={() => {
															remove(index);
															deleteData({
																endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts/${contactInfo.contactTypeID}`,
															});
														}}
													/>
												</div>
											</div>
										) : (
											<div className="w-full flex gap-3">
												<div className="flex flex-row lg:flex-row md:flex-row sm:flex-col w-full gap-3">
													<Select
														// value={String(
														// 	values.contactInformation[index]
														// 		.contactTypeID
														// )}
														name={`contactInformation.[${index}].contactTypeID`}
														onValueChange={(
															value
														) => {
															// console.log("contactInfo", contactInfo);
															// Setbuilding(value);
															setFieldValue(
																`contactInformation.[${index}].contactTypeID`,
																Number(value)
															);
														}}
													>
														<SelectTrigger
															data-test="select-contact-type"
															className={`${style.CustomInput} w-full mt-[25px] min-h-[43px] cursor-pointer `}
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
																				key={
																					index
																				}
																				data-test={`option-${index}`}
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
																		هیچ راه
																		ارتباطی
																		یافت نشد
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
													className="text-fire-orange rounded-sm hover:cursor-pointer flex mt-8 w-fit"
													onClick={() => {
														remove(index);
														deleteData({
															endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts/${contactInfo.contactTypeID}`,
															// endPoint: `${baseURL}/v1/user/corps/registration/${corpId}/contacts/0`,
														});
													}}
												/>
											</div>
										)}
									</div>
								</>
							)
						)}

						<button
							className="place-self-start cta-neu-button w-full md:w-1/2 lg:w-2/5 mt-8"
							data-test="add-contact"
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
