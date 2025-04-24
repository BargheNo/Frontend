import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@radix-ui/react-select";
import { FieldArray } from "formik";
import style from "./ContactInfoForm.module.css";
import { Phone, XIcon } from "lucide-react";
import React from "react";

export default function ContactInfoForm({
	setFieldValue,
	values,
}: {
	setFieldValue?: any;
	values: corpData;
}) {
	return (
		<FieldArray name="contactInformation">
			{({ push, remove }) => (
				<>
					{values.contactInformation?.map((id, index) => (
						<div
							key={index}
							className="flex gap-3 items-end w-full"
						>
							<div className="flex w-[95%] gap-3">
								<Select
									name="building"
									onValueChange={(value) => {
										// Setbuilding(value);
										setFieldValue("building", value);
									}}
								>
									<SelectTrigger
										className={`${style.CustomInput} mt-[27px] min-h-[43px]`}
									>
										<SelectValue placeholder="نوع ساختمان" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>
												نوع ساختمان
											</SelectLabel>
											<SelectItem value="residential">
												مسکونی
											</SelectItem>
											<SelectItem value="commercial">
												تجاری
											</SelectItem>
											<SelectItem value="industrial">
												صنعتی
											</SelectItem>
											<SelectItem value="argiculture">
												کشاورزی
											</SelectItem>
											<SelectItem value="more">
												سایر
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<CustomInput
									name={`contactInformation.[${index}].position`}
									placeholder="اطلاعات تماس"
									icon={Phone}
									// key={`position-${id}`}
								/>
							</div>
							<XIcon
								className="text-fire-orange rounded-sm hover:cursor-pointer flex mb-3 w-fit"
								onClick={() => {
									remove(index);
								}}
							/>
						</div>
					))}

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
	);
}
